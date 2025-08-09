package download

import (
	"media-lib/internal/pkg/downloader"
)

var d *downloader.Downloader

func Init(logger downloader.Logger) {
	d = downloader.New(func(r *downloader.SegmentRow) {
		logger.Debug("download", r.Path)
	})
}

// func Downloader() *downloader.Downloader {
// 	return d
// }

func AddResource(url, name string, logger downloader.Logger) error {
	resource := downloader.NewResource(url, name, "", nil)
	return d.AddResource(resource, logger)
}
