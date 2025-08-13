package downloader

import (
	"testing"

	"github.com/sirupsen/logrus"
)

var url = "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/tears-of-steel-audio_eng=64008-video_eng=401000.m3u8"
var name = "tears-of-steel"

func TestDownloader(t *testing.T) {
	logger := logrus.New()
	sf := WithSegmentFinish(func(sr *SegmentRow) {
		t.Logf("download segment %s finished, status: %d", sr.Path, sr.Status)
	})
	tf := WithTaskFinally(func(r *Resource, err error) {
		if err != nil {
			t.Log("task error:", err)
		}
		t.Logf("task %s finished", r.filename)
	})
	d := New(sf, tf)
	resource := NewResource(url, name, "", nil)
	d.AddResource(resource, logger)
	d.Close()
	d.Wait()
}
