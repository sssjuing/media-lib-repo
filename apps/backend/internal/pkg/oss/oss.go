package oss

import (
	"context"
	"fmt"
	"log"
	"media-lib/internal/pkg/config"
	"mime/multipart"
	"path/filepath"
	"sort"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var minioClient *minio.Client
var bucketName string

func init() {
	config := config.GetConfig()
	minioEndpoint := config.GetString("minio.endpoint")
	username := config.GetString("minio.username")
	password := config.GetString("minio.password")
	// Initialize minio client object.
	client, err := minio.New(minioEndpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(username, password, ""),
		Secure: false,
	})
	if err != nil {
		log.Fatal(err)
	}
	minioClient = client
	bucketName = config.GetString("minio.bucketName")
}

func GetFiles(folderName string) (*[]minio.ObjectInfo, error) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	result := []minio.ObjectInfo{}
	objectCh := minioClient.ListObjects(ctx, bucketName, minio.ListObjectsOptions{Prefix: folderName, Recursive: false})
	for object := range objectCh {
		if object.Err != nil {
			fmt.Println(object.Err)
			return nil, object.Err
		}
		result = append(result, object)
	}
	sort.Slice(result, func(i, j int) bool {
		if result[i].LastModified.Equal(time.Time{}) {
			result[i].LastModified = time.Now()
		}
		if result[j].LastModified.Equal(time.Time{}) {
			result[j].LastModified = time.Now()
		}
		return result[i].LastModified.After(result[j].LastModified)
	})
	return &result, nil
}

type UploadInfo struct {
	Path string
	Size int64
}

func UploadFile(file *multipart.File, objectPath string) (*UploadInfo, error) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	info, err := minioClient.PutObject(ctx, bucketName, objectPath, *file, -1, minio.PutObjectOptions{ContentType: "application/octet-stream"})
	if err != nil {
		return nil, err
	}
	return &UploadInfo{Path: filepath.Join("/", bucketName, objectPath), Size: info.Size}, nil
}
