package service

import (
	"media-lib/internal/app/server/model"
	"media-lib/internal/app/server/repository"
	"media-lib/internal/app/server/types"
	"media-lib/internal/pkg/utils"

	"gorm.io/datatypes"
)

type VideoService interface {
	// GetList(repository.VidoesQueryOptions) ([]dto.VideoDTO, int64, error)
	Create(*types.CreateVideoDTO) (*types.VideoDTO, error)
	Update(*model.Video, *types.UpdateVideoDTO) (*types.VideoDTO, error)
}

type VideoServiceImpl struct {
	videoRepo repository.VideoRepository
}

func NewVideoService(videoRepo repository.VideoRepository) *VideoServiceImpl {
	return &VideoServiceImpl{
		videoRepo: videoRepo,
	}
}

// func (svc *VideoServiceImpl) GetList(options repository.VidoesQueryOptions) ([]dto.VideoDTO, int64, error) {
// 	videos, count, err := svc.videoRepo.FindAll(options)
// 	if err != nil {
// 		return nil, 0, err
// 	}
// 	list := utils.Map(videos, func(v model.Video) dto.VideoDTO {
// 		return *v.DTO()
// 	})
// 	return list, count, nil
// }

func (svc *VideoServiceImpl) Create(cvd *types.CreateVideoDTO) (*types.VideoDTO, error) {
	v := model.Video{
		SerialNumber: cvd.SerialNumber,
		CoverPath:    cvd.CoverPath,
		Title:        cvd.Title,
		ChineseTitle: cvd.ChineseTitle,
		Actresses: utils.Map(cvd.Actresses, func(ad *types.ActressDTO) *model.Actress {
			return &model.Actress{ID: ad.ID}
		}),
		ReleaseDate: cvd.ReleaseDate,
		VideoPath:   cvd.VideoPath,
		Mosaic:      cvd.Mosaic,
		Tags:        (*datatypes.JSON)(cvd.Tags),
		Synopsis:    cvd.Synopsis,
	}
	if err := svc.videoRepo.Create(&v); err != nil {
		return nil, err
	}
	return v.DTO(), nil
}

func (svc *VideoServiceImpl) Update(v *model.Video, uvd *types.UpdateVideoDTO) (*types.VideoDTO, error) {
	v.SerialNumber = uvd.SerialNumber
	v.CoverPath = uvd.CoverPath
	v.Title = uvd.Title
	v.ChineseTitle = uvd.ChineseTitle
	v.Actresses = utils.Map(uvd.Actresses, func(ad *types.ActressDTO) *model.Actress {
		return &model.Actress{ID: ad.ID}
	})
	v.ReleaseDate = uvd.ReleaseDate
	v.VideoPath = uvd.VideoPath
	v.Mosaic = uvd.Mosaic
	v.Tags = (*datatypes.JSON)(uvd.Tags)
	v.Synopsis = uvd.Synopsis
	if err := svc.videoRepo.Update(v); err != nil {
		return nil, err
	}
	return v.DTO(), nil
}
