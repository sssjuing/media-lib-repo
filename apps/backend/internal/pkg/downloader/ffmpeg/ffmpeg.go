package ffmpeg

import (
	"fmt"
	"os"
	"path/filepath"

	ffmpeg_go "github.com/u2takey/ffmpeg-go"
)

func ConvertFormat(inputpath string) error {
	dir := filepath.Dir(inputpath)
	base := filepath.Base(inputpath)
	name := base[:len(base)-len(filepath.Ext(base))]
	outputpath := filepath.Join(dir, fmt.Sprintf("%s%s", name, "_360p.mp4"))
	ffmpeg_go.Input(
		inputpath,
		// ffmpeg_go.KwArgs{"hwaccel": "cuda", "hwaccel_output_format": "cuda"},
	).Output(
		outputpath,
		ffmpeg_go.KwArgs{
			// "vf":                    "scale_cuda=640:360",
			"b:v": "512K",
			// "c:v":                   "h264_nvenc",
			// "max_muxing_queue_size": 1024, // -max_muxing_queue_size 1024
			"vf": "scale=640:360",
		}).
		OverWriteOutput(). // 保证 -y 生效
		WithOutput(os.Stdout).
		WithErrorOutput(os.Stdout). // 实时刷到终端
		Compile()
	// log.Println(">>> running:", cmd.Run())
	// out, err := cmd.CombinedOutput()
	// if err != nil {
	// 	return fmt.Errorf("ffmpeg failed: %w\n%s", err, out)
	// }
	return nil
}
