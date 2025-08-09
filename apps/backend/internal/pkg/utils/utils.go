package utils

import (
	"io"
	"os"
	"path"
	"path/filepath"
	"runtime"
	"strconv"
)

func ParseUint(str string) (uint, error) {
	actressId, err := strconv.ParseUint(str, 10, 32)
	if err != nil {
		return 0, err
	}
	return uint(actressId), nil
}

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

func ReadFile(filePath string) ([]byte, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	data, err := io.ReadAll(file) // 读取文件内容
	if err != nil {
		return nil, err
	}
	return data, nil
}
