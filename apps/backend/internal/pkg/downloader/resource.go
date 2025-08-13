package downloader

import (
	"bufio"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gammazero/workerpool"
	"github.com/samber/lo"
)

type SegmentRow struct {
	Url    string `json:"u"` // ts 片段的 URL
	Path   string `json:"p"` // 下载的 ts 片段的存储位置
	Status int    `json:"s"` // 下载 ts 片段的状态 -1-失败 0-未开始 1-成功
}

type Resource struct {
	m3u8URL     string
	filename    string
	tempDir     string // 用于临时存放切片文件的目录
	segmentList []SegmentRow
	total       int // 切片数量
}

func NewResource(url, name, tempDir string, segments []SegmentRow) *Resource {
	r := &Resource{
		m3u8URL:  url,
		filename: name,
		tempDir:  tempDir,
		// tempDir: filepath.Join("/var/tmp/media-lib", name),
	}
	if segments != nil {
		r.segmentList = segments
		r.total = len(segments)
	}
	return r
}

type ResourcePO struct {
	Url   string `json:"u"`
	Name  string `json:"n"`
	Total int    `json:"t"`
}

func (r *Resource) PO() ResourcePO {
	return ResourcePO{Url: r.m3u8URL, Name: r.filename, Total: r.total}
}

func (r *Resource) MakeSegmentList() error {
	// 下载 m3u8 文件内容
	resp, err := http.Get(r.m3u8URL)
	if err != nil {
		return fmt.Errorf("fail to download m3u8 file: %w", err)
	}
	defer resp.Body.Close()

	// 解析 m3u8 文件
	r.segmentList = make([]SegmentRow, 0, 3000)
	scanner := bufio.NewScanner(resp.Body)
	baseURL := r.m3u8URL[:strings.LastIndex(r.m3u8URL, "/")+1]

	idx := 0
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if !strings.HasPrefix(line, "#") {
			path := filepath.Join(r.tempDir, fmt.Sprintf("segment_%04d.ts", idx))
			idx++
			if strings.HasPrefix(line, "http") {
				r.segmentList = append(r.segmentList, SegmentRow{Url: line, Path: path})
			} else {
				r.segmentList = append(r.segmentList, SegmentRow{Url: baseURL + line, Path: path})
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return fmt.Errorf("fail to read m3u8 file: %w", err)
	}
	r.total = len(r.segmentList)
	return nil
}

func (r *Resource) MakeTempDir() error {
	if err := os.MkdirAll(r.tempDir, 0755); err != nil {
		return fmt.Errorf("fail to create temporary directory: %w", err)
	}
	return nil
}

func (r *Resource) DownloadSegments(onFinish func(sr *SegmentRow)) {
	wp := workerpool.New(6)

	for idx := range r.segmentList {
		segment := &r.segmentList[idx]
		wp.Submit(func() {
			if segment.Status == 1 { // 跳过已经成功下载的 segment
				return
			}
			if err := downloadFile(segment.Url, segment.Path); err != nil {
				segment.Status = -1
			} else {
				segment.Status = 1
			}
			onFinish(segment)
		})
	}

	wp.StopWait()
}

// 检查所有的切片是否都已下载成功
func (r *Resource) CheckSegments() bool {
	return lo.EveryBy(r.segmentList, func(sr SegmentRow) bool {
		return sr.Status == 1
	})
}

func (r *Resource) MergeSegments(targetDir string) error {
	segmentPaths := lo.Map(r.segmentList, func(sr SegmentRow, _ int) string {
		return sr.Path
	})
	return mergeFiles(segmentPaths, filepath.Join(targetDir, r.filename+".ts"))
}
