package oss

import (
	"context"
	"fmt"
	"mime"
	"testing"
)

func TestGetFiles(t *testing.T) {
	result, _ := GetFiles("pictures/covers")
	for _, item := range result {
		fmt.Println(*item)
	}
}

func TestTypeByExtension(t *testing.T) {
	t.Log(mime.TypeByExtension(".mp4"))
	t.Log(mime.TypeByExtension(".jpg"))
	t.Log(mime.TypeByExtension("x.jpg"))
}

func TestUploadLocalFile(t *testing.T) {
	info, err := UploadLocalFile(context.Background(), "/tmp/sss.ts", "/data/zq3-jx3/zq3-jx3.ts")
	if err != nil {
		t.Error(err)
		return
	}
	t.Log(info)
}
