package downloader

import (
	"crypto/md5"
	"encoding/hex"
)

type SegmentRow struct {
	Url    string `json:"u"` // ts 片段的 URL
	Path   string `json:"p"` // 下载的 ts 片段的存储位置
	Status int    `json:"s"` // 下载 ts 片段的状态 -1-失败 0-未开始 1-成功
}

type Resource struct {
	ID          string       `json:"id"`          // m3u8 + name 的 md5 字符串
	M3u8URL     string       `json:"url"`         //
	Filename    string       `json:"name"`        // 文件名, 不含后缀
	TempDir     string       `json:"temp_dir"`    // 用于临时存放切片文件的目录
	SegmentList []SegmentRow `json:"segments"`    // 切片数组
	Downloading bool         `json:"downloading"` // 是否正在下载中
}

func NewResource(url, name, tempDir string, segments []SegmentRow) *Resource {
	sum := md5.Sum([]byte(url + name))
	r := &Resource{
		// ID:    fmt.Sprintf("%x", md5.Sum([]byte(url+name))),
		ID:       hex.EncodeToString(sum[:]),
		M3u8URL:  url,
		Filename: name,
		TempDir:  tempDir,
	}
	if segments != nil {
		r.SegmentList = segments
	}
	return r
}
