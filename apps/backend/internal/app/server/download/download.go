package download

import (
	"media-lib/internal/pkg/downloader"
)

// TODO: 屏蔽重复添加已经在任务队列中的任务

var d *downloader.Downloader

func Init(logger downloader.Logger) {
	sf := downloader.WithSegmentFinish(func(r *downloader.SegmentRow) {
		logger.Debugf("downloading: %s, %d", r.Path, r.Status)
	})
	tf := downloader.WithTaskFinally(func(r *downloader.Resource, err error) {
		po := r.PO()
		logger.Infof("task %s finished, total: %d", po.Name, po.Total)
		if err != nil {
			logger.Error(err)
		}
	})
	d = downloader.New(sf, tf)
}

// func Downloader() *downloader.Downloader {
// 	return d
// }

func AddResource(url, name string, logger downloader.Logger) error {
	resource := downloader.NewResource(url, name, "", nil)
	return d.AddResource(resource, logger)
}
