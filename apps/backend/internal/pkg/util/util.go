package util

import (
	"os"
	"path"
	"path/filepath"
	"runtime"
)

func findModuleRoot(path string) string {
	if path == "/" {
		return ""
	}
	modFilePath := filepath.Join(path, "go.mod")
	if _, err := os.Stat(modFilePath); err == nil {
		return path
	}
	return findModuleRoot(filepath.Dir(path)) // 向上递归查找
}

func GetRootPath() string {
	_, filename, _, _ := runtime.Caller(0) // 获取当前文件路径
	localPath := path.Dir(filename)        // 获取当前文件所在目录
	return findModuleRoot(localPath)
}
