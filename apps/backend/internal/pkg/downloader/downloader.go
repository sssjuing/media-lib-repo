package downloader

import (
	"context"
	"fmt"
	"media-lib/pkg/taskqueue"
	"os"
	"path/filepath"
)

type taskImpl struct {
	resource        *Resource
	logger          Logger
	onSegmentFinish func(r *SegmentRow) // 片段下载完成时的回调函数
}

func (t *taskImpl) PreExecute() error {
	// segmentList 为空说明是新的任务，需要下载并解析 m3u8 文件来创建
	if t.resource.segmentList == nil {
		t.logger.Info("download m3u8 file")
		if err := t.resource.MakeSegmentList(); err != nil {
			return fmt.Errorf("fail to make segment list: %w", err)
		}
	}
	t.logger.Info("create temporary directory")
	if err := t.resource.MakeTempDir(); err != nil {
		return fmt.Errorf("fail to create temporary directory: %w", err)
	}
	return nil
}

func (t *taskImpl) Execute() {
	func() error {
		t.logger.Info("start to download segments")
		t.resource.DownloadSegments(t.onSegmentFinish) // 传入 onFinish 用于向外部同步切片的下载状态

		if !t.resource.CheckSegments() {
			return fmt.Errorf("some segments did not download successfully")
		}

		t.logger.Info("merging segments")
		if err := t.resource.MergeSegments("/data"); err != nil {
			return fmt.Errorf("fail to merging segments: %w", err)
		}

		t.logger.Info("delete temporary directory")
		return os.RemoveAll(t.resource.tempDir)
	}()
}

type Downloader struct {
	taskQueue       *taskqueue.TaskQueue
	onSegmentFinish func(r *SegmentRow) // 片段下载完成时的回调函数
}

func New(onSegmentFinish func(r *SegmentRow)) *Downloader {
	d := &Downloader{
		taskQueue:       taskqueue.New(context.Background()),
		onSegmentFinish: onSegmentFinish, // 片段下载完成时的回调函数
	}
	return d
}

// 添加任务到队列, 此方法被多个协程同时调用时, closed 用于保证线程安全
func (d *Downloader) AddResource(r *Resource, logger Logger) error {
	if r.segmentList == nil || r.tempDir == "" {
		r.tempDir = filepath.Join("/var/tmp/media-lib", r.filename)
	}
	task := &taskImpl{resource: r, logger: logger, onSegmentFinish: d.onSegmentFinish}
	if err := task.PreExecute(); err != nil {
		return err
	}
	if ok := d.taskQueue.AddTask(task); !ok {
		return fmt.Errorf("downloader has been closed")
	}
	return nil
}

// // 返回错误通知通道
// func (d *Downloader) ErrorChan() <-chan error {
// 	return d.errorChan
// }

// 关闭队列
func (d *Downloader) Close() {
	d.taskQueue.Close()
}

// 等待所有任务完成
func (d *Downloader) Wait() {
	d.taskQueue.Wait()
}
