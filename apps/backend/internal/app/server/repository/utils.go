package repository

import "gorm.io/gorm"

func paginate(page, pageSize int) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		if page == 0 {
			page = 1
		}
		if pageSize == 0 {
			pageSize = 10
		}
		return db.Limit(pageSize).Offset((page - 1) * pageSize)
	}
}
