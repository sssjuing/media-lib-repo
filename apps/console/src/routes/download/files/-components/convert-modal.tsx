import { Alert, Modal, Typography } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { CodeHighlighter } from '@/components/code-highlighter';

export const ConvertModal = NiceModal.create(({ path }: { path?: string }) => {
  const modal = useModal();

  const cmd = `sudo ffmpeg \\
-hwaccel cuda \\
-hwaccel_output_format cuda \\
-i ${path} \\
-vf scale_cuda=640:360 \\
-c:v h264_nvenc \\
-b:v 512K \\
-max_muxing_queue_size 1024 \\
-y ${path?.slice(0, path.lastIndexOf('.'))}_360p.mp4`;

  const dockerCmd = `docker run --rm -it \\
--runtime=nvidia \\
-v $(pwd)/data:/data \\
linuxserver/ffmpeg:6.1.1 \\
-hwaccel cuda \\
-hwaccel_output_format cuda \\
-i ${path} \\
-vf scale_cuda=640:360 \\
-c:v h264_nvenc \\
-b:v 512K \\
-max_muxing_queue_size 1024 \\
-y ${path?.slice(0, path.lastIndexOf('.'))}_360p.mp4`;

  return (
    <Modal
      title="转换文件"
      open={modal.visible}
      footer={null}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div className="mt-4">
        <Alert message="将以下命令拷贝到目标主机上执行" type="info" />
      </div>
      <div className="relative flex overflow-auto">
        <Typography.Paragraph copyable={{ text: cmd }} className="absolute top-5 right-5" />
        <CodeHighlighter code={cmd} lang="bash" className="flex-1 w-0" />
      </div>
      <div className="mt-4">
        <Alert message="或者借助 docker 容器执行转换" type="info" />
      </div>
      <div className="relative flex overflow-auto">
        <Typography.Paragraph copyable={{ text: dockerCmd }} className="absolute top-5 right-5" />
        <CodeHighlighter code={dockerCmd} lang="bash" className="flex-1 w-0" />
      </div>
    </Modal>
  );
});
