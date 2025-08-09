package downloader

import "testing"

var url = "https://test-streams.mux.dev/x36xhzz/url_4/193039199_mp4_h264_aac_7.m3u8"
var name = "big-buck-bunny"

func TestMakeSegmentList(t *testing.T) {
	// url := "https://surrit.com/964d8939-b398-4c98-9ea5-e58b9a6164bb/1280x720/video.m3u8"
	r := NewResource(url, name, "tmp", nil)
	r.MakeSegmentList()
	t.Logf("name: %s; total: %d; segment length: %d", r.filename, r.total, len(r.segmentList))
	t.Log(r.segmentList[0])
}

func TestDownloadSegments(t *testing.T) {
	r := NewResource(url, name, "tmp", nil)
	r.MakeSegmentList()
	r.segmentList = r.segmentList[:5]
	r.segmentList[2].Status = 1

	r.MakeTempDir()
	r.DownloadSegments(func(sr *SegmentRow) {
		t.Log(sr.Path)
	})
	for idx, sr := range r.segmentList {
		t.Log(idx, sr.Path, sr.Status)
	}
}

func TestMerge(t *testing.T) {
	r := NewResource(url, name, "tmp", nil)
	r.MakeSegmentList()
	r.segmentList = r.segmentList[:5]

	r.MakeTempDir()
	r.DownloadSegments(func(sr *SegmentRow) {
		t.Log(sr.Path)
	})
	r.MergeSegments("tmp")
}
