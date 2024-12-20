package util

import (
	"media-lib/internal/app/server/model"
	"media-lib/internal/pkg/config"
)

var publicUrl string

func init() {
	publicUrl = config.GetMinioPublicUrl()
}

func VideoMapper(video *model.Video) *model.VideoDTO {
	var videoUrl *string
	if video.VideoPath != nil && *video.VideoPath != "" {
		tmp := publicUrl + *video.VideoPath
		videoUrl = &tmp
	}
	return &model.VideoDTO{
		Video:    *video,
		CoverUrl: publicUrl + video.CoverPath,
		VideoUrl: videoUrl,
	}
}
