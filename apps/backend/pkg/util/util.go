package util

import "strconv"

func ParseUint(str string) (uint, error) {
	actressId, err := strconv.ParseUint(str, 10, 32)
	if err != nil {
		return 0, err
	}
	return uint(actressId), nil
}
