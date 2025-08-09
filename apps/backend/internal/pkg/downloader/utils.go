package downloader

import (
	"io"
	"net/http"
	"os"
)

// 下载单个文件
func downloadFile(url, filepath string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	out, err := os.Create(filepath)
	if err != nil {
		return err
	}
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	return err
}

// 合并 ts 文件
func mergeFiles(inputFilepaths []string, outputFilepath string) error {
	out, err := os.Create(outputFilepath)
	if err != nil {
		return err
	}
	defer out.Close()

	for _, tsFile := range inputFilepaths {
		in, err := os.Open(tsFile)
		if err != nil {
			return err
		}
		_, err = io.Copy(out, in)
		in.Close()
		if err != nil {
			return err
		}
	}
	return nil
}
