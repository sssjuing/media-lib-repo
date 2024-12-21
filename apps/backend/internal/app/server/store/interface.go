package store

import "media-lib/internal/app/server/model"

type IActressStore interface {
	GetList() ([]*model.Actress, error)
	GetById(string) (*model.Actress, error)
	Create(*model.Actress) error
	Update(*model.Actress) error
	Delete(*model.Actress) error
}

type IVideoStore interface {
	GetList() ([]*model.Video, error)
	GetListByActressId(uint) ([]*model.Video, error)
	GetById(string) (*model.Video, error)
	Create(*model.Video) error
	Update(*model.Video) error
	Delete(*model.Video) error
}
