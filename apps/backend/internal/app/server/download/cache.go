package download

// https://grok.com/share/c2hhcmQtMw%3D%3D_6e9aa440-3650-4cee-83bf-43829ea16612

import (
	"github.com/samber/lo"
	"github.com/sssjuing/media-lib-repo/apps/backend/internal/pkg/downloader"
)

type Cache struct {
	resourceList []*downloader.Resource
}

func NewCache() *Cache {
	return &Cache{resourceList: make([]*downloader.Resource, 0, 10)}
}

func (c *Cache) FindAll() []*downloader.Resource {
	return c.resourceList
}

func (c *Cache) FindByID(id string) *downloader.Resource {
	r, ok := lo.Find(c.resourceList, func(r *downloader.Resource) bool {
		return r.ID == id
	})
	if !ok {
		return nil
	}
	return r
}

func (c *Cache) FindByName(name string) *downloader.Resource {
	r, ok := lo.Find(c.resourceList, func(r *downloader.Resource) bool {
		return r.Filename == name
	})
	if !ok {
		return nil
	}
	return r
}

func (c *Cache) Add(r *downloader.Resource) {
	c.resourceList = append(c.resourceList, r)
}

func (c *Cache) Delete(id string) {
	c.resourceList = lo.Filter(c.resourceList, func(r *downloader.Resource, _ int) bool {
		return r.ID == id
	})
}
