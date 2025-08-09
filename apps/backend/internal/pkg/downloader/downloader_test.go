package downloader

import (
	"testing"

	"github.com/sirupsen/logrus"
)

func TestDownloader(t *testing.T) {
	logger := logrus.New()
	d := New(func(r *SegmentRow) {
		t.Log(r.Path)
	})
	d.AddResource(NewResource("https://test-streams.mux.dev/x36xhzz/url_4/193039199_mp4_h264_aac_7.m3u8", "big-buck-bunny", "", nil), logger)
	d.Close()
	d.Wait()
}
