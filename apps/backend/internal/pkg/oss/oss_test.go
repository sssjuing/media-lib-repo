package oss

import (
	"fmt"
	"testing"
)

func TestGetFiles(t *testing.T) {
	result, _ := GetFiles("pictures/covers")
	for _, item := range result {
		fmt.Println(*item)
	}
}
