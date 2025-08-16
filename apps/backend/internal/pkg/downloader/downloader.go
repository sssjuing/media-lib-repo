package downloader

import (
	"bufio"
	"fmt"
	"media-lib/internal/pkg/logger"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/gammazero/workerpool"
	"github.com/samber/lo"
)

type Option func(*Downloader)

type Downloader struct {
	resource        *Resource
	onSegmentFinish func(r *SegmentRow)    // 片段下载完成时的回调函数
	onFinally       func(*Resource, error) // 当任务结束时的回调, 无论成功/失败
	logger          logger.Logger
}

func WithSegmentFinish(fn func(r *SegmentRow)) Option {
	return func(d *Downloader) { d.onSegmentFinish = fn }
}

func WithFinally(fn func(*Resource, error)) Option {
	return func(d *Downloader) { d.onFinally = fn }
}

func WithLogger(logger logger.Logger) Option {
	return func(d *Downloader) { d.logger = logger }
}

func New(resource *Resource, opts ...Option) *Downloader {
	d := &Downloader{
		resource:        resource,
		onSegmentFinish: func(r *SegmentRow) {}, // 片段下载完成时的回调函数
		logger:          logger.GetLogger(),
	}
	for _, opt := range opts {
		opt(d)
	}
	return d
}

func (d *Downloader) makeSegmentList() error {
	r := d.resource
	// 下载 m3u8 文件内容
	resp, err := http.Get(r.M3u8URL)
	if err != nil {
		return fmt.Errorf("fail to download m3u8 file: %w", err)
	}
	defer resp.Body.Close()

	// 解析 m3u8 文件
	r.SegmentList = make([]SegmentRow, 0, 3000)
	scanner := bufio.NewScanner(resp.Body)
	baseURL := r.M3u8URL[:strings.LastIndex(r.M3u8URL, "/")+1]

	idx := 0
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if !strings.HasPrefix(line, "#") {
			path := filepath.Join(r.TempDir, fmt.Sprintf("segment_%04d.ts", idx))
			idx++
			if strings.HasPrefix(line, "http") {
				r.SegmentList = append(r.SegmentList, SegmentRow{Url: line, Path: path})
			} else {
				r.SegmentList = append(r.SegmentList, SegmentRow{Url: baseURL + line, Path: path})
			}
		}
	}

	if err := scanner.Err(); err != nil {
		return fmt.Errorf("fail to read m3u8 file: %w", err)
	}
	return nil
}

func (d *Downloader) makeTempDir() error {
	if err := os.MkdirAll(d.resource.TempDir, 0755); err != nil {
		return fmt.Errorf("fail to create temporary directory: %w", err)
	}
	return nil
}

func (d *Downloader) downloadSegments(onFinish func(sr *SegmentRow)) {
	wp := workerpool.New(6)
	for idx := range d.resource.SegmentList {
		segment := &d.resource.SegmentList[idx]
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
func (d *Downloader) checkSegments() bool {
	return lo.EveryBy(d.resource.SegmentList, func(sr SegmentRow) bool {
		return sr.Status == 1
	})
}

func (d *Downloader) mergeSegments(targetDir string) error {
	segmentPaths := lo.Map(d.resource.SegmentList, func(sr SegmentRow, _ int) string {
		return sr.Path
	})
	return mergeFiles(segmentPaths, filepath.Join(targetDir, d.resource.Filename+".ts"))
}

func (d *Downloader) PreExecute() error {
	// segmentList 为空说明是新的任务，需要下载并解析 m3u8 文件来创建
	if d.resource.SegmentList == nil {
		d.logger.Info("download m3u8 file")
		if err := d.makeSegmentList(); err != nil {
			return fmt.Errorf("fail to make segment list: %w", err)
		}
	}
	d.logger.Info("create temporary directory")
	if err := d.makeTempDir(); err != nil {
		return fmt.Errorf("fail to create temporary directory: %w", err)
	}
	return nil
}

func (d *Downloader) Execute() {
	d.resource.Downloading = true
	defer func() { d.resource.Downloading = false }()

	err := func() error {
		d.logger.Infof("start to download %d segments", len(d.resource.SegmentList))
		d.downloadSegments(d.onSegmentFinish) // 传入 onFinish 用于向外部同步切片的下载状态

		if !d.checkSegments() {
			return fmt.Errorf("some segments did not download successfully")
		}

		d.logger.Info("merging segments")
		if err := d.mergeSegments("/data"); err != nil {
			return fmt.Errorf("fail to merging segments: %w", err)
		}

		d.logger.Info("delete temporary directory")
		if err := os.RemoveAll(d.resource.TempDir); err != nil {
			return err
		}
		d.resource.Success = true
		return nil
	}()
	d.onFinally(d.resource, err)
}
