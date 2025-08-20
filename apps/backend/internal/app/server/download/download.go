package download

import (
	"context"
	"fmt"
	"path/filepath"

	mapset "github.com/deckarep/golang-set/v2"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/config"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/downloader"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/logger"
	"github.com/sssjuing/media-lib-repo/apps/backend/pkg/taskqueue"
)

var hashSet mapset.Set[string]
var tq *taskqueue.TaskQueue
var cache *Cache

func Init(logger logger.Logger) {
	hashSet = mapset.NewSet[string]()
	tq = taskqueue.New(context.Background())
	cache = NewCache()
}

func createDownloader(resource *downloader.Resource, logger logger.Logger) *downloader.Downloader {
	wsf := downloader.WithSegmentFinish(func(sr *downloader.SegmentRow) {
		logger.Debugf("downloading: %s, %d", sr.Path, sr.Status)
	})
	wtf := downloader.WithFinally(func(r *downloader.Resource, err error) {
		logger.Infof("task %s finished, total: %d", r.Filename, len(r.SegmentList))
		if err != nil {
			logger.Error(err)
		}
		hashSet.Remove(r.ID)
	})
	wl := downloader.WithLogger(logger)
	return downloader.New(resource, wsf, wtf, wl)
}

func AddTask(url, name string, logger logger.Logger) error {
	workPath := config.GetConfig().GetString("server.work_path")
	resource := downloader.NewResource(url, name, filepath.Join(workPath, "tmp", name), nil)
	if ok := hashSet.Add(resource.ID); !ok {
		return fmt.Errorf("task %s is already included in the queue, please do not add it repeatedly", name)
	}
	if cache.FindByID(resource.ID) == nil {
		cache.Add(resource)
	}
	d := createDownloader(resource, logger)
	d.PreExecute()
	if ok := tq.AddTask(d); !ok {
		return fmt.Errorf("downloader has been closed")
	}
	return nil
}

func RetryTask(r *downloader.Resource, logger logger.Logger) error {
	if r.Success {
		return fmt.Errorf("cannot add already successful tasks to the queue")
	}
	if ok := hashSet.Add(r.ID); !ok {
		return fmt.Errorf("task %s is already included in the queue, please do not add it repeatedly", r.Filename)
	}
	d := createDownloader(r, logger)
	d.PreExecute()
	if ok := tq.AddTask(d); !ok {
		return fmt.Errorf("downloader has been closed")
	}
	return nil
}

func GetCache() *Cache {
	return cache
}
