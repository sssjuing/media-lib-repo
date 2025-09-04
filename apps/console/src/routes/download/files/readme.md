```bash
docker run --rm -it \
--runtime=nvidia \
-v $(pwd)/data:/data \
linuxserver/ffmpeg:6.1.1 \
-hwaccel cuda \
-hwaccel_output_format cuda \
-i /data/downloads/SSIS-724/SSIS-724.ts \
-vf scale_cuda=640:360 \
-c:v h264_nvenc \
-b:v 512K \
-max_muxing_queue_size 1024 \
-y /data/downloads/SSIS-724/SSIS-724_360p.mp4
```
