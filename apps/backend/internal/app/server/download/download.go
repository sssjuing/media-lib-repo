package download

import (
	"context"
	"fmt"
	"media-lib/internal/pkg/downloader"
	"media-lib/internal/pkg/logger"
	"media-lib/pkg/taskqueue"
	"path/filepath"

	mapset "github.com/deckarep/golang-set/v2"
)

var hashSet mapset.Set[string]
var tq *taskqueue.TaskQueue

func Init(logger logger.Logger) {
	hashSet = mapset.NewSet[string]()
	tq = taskqueue.New(context.Background())
}

func AddTask(url, name string, logger logger.Logger) error {
	resource := downloader.NewResource(url, name, filepath.Join("/var/tmp/media-lib", name), nil)
	if ok := hashSet.Add(resource.ID); !ok {
		return fmt.Errorf("task %s is already included in the queue, please do not add it repeatedly", name)
	}
	wsf := downloader.WithSegmentFinish(func(r *downloader.SegmentRow) {
		logger.Debugf("downloading: %s, %d", r.Path, r.Status)
	})
	wtf := downloader.WithFinally(func(r *downloader.Resource, err error) {
		logger.Infof("task %s finished, total: %d", r.Filename, len(r.SegmentList))
		if err != nil {
			logger.Error(err)
		}
		hashSet.Remove(r.ID)
	})
	wl := downloader.WithLogger(logger)
	d := downloader.New(resource, wsf, wtf, wl)
	d.PreExecute()
	if ok := tq.AddTask(d); !ok {
		return fmt.Errorf("downloader has been closed")
	}
	return nil
}
