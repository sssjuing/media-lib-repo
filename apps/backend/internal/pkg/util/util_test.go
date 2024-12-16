package util

import (
	"fmt"
	"testing"
)

func TestGetConfigsDirPath(t *testing.T) {
	path := GetRootPath()
	fmt.Println(path)
}
