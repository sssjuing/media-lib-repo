package download

import (
	"crypto/md5"
	"fmt"
	"media-lib/internal/pkg/downloader"

	mapset "github.com/deckarep/golang-set/v2"
)

var hashSet mapset.Set[[16]byte]
var d *downloader.Downloader

func Init(logger downloader.Logger) {
	hashSet = mapset.NewSet[[16]byte]()
	sf := downloader.WithSegmentFinish(func(r *downloader.SegmentRow) {
		logger.Debugf("downloading: %s, %d", r.Path, r.Status)
	})
	tf := downloader.WithTaskFinally(func(r *downloader.Resource, err error) {
		po := r.PO()
		logger.Infof("task %s finished, total: %d", po.Name, po.Total)
		if err != nil {
			logger.Error(err)
		}
		hashSet.Remove(md5.Sum([]byte(po.Url + po.Name)))
	})
	d = downloader.New(sf, tf)
}

//	func Downloader() *downloader.Downloader {
//		return d
//	}
//

func AddResource(url, name string, logger downloader.Logger) error {
	if ok := hashSet.Add(md5.Sum([]byte(url + name))); !ok {
		return fmt.Errorf("task %s is already included in the queue, please do not add it repeatedly", name)
	}
	resource := downloader.NewResource(url, name, "", nil)
	if err := d.AddResource(resource, logger); err != nil {
		return err
	}
	return nil
}
