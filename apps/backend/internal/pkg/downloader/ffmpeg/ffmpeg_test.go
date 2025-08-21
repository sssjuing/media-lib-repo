package ffmpeg

import "testing"

func TestConvertFormat(t *testing.T) {
	if err := ConvertFormat("/data/downloads/JUY-678/JUY-678.ts"); err != nil {
		t.Error(err)
	}
}
