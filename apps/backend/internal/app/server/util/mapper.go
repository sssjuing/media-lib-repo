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
		videoUrl = new(string)
		*videoUrl = publicUrl + *video.VideoPath
	}
	return &model.VideoDTO{
		Video:    *video,
		CoverUrl: publicUrl + video.CoverPath,
		VideoUrl: videoUrl,
	}
}
