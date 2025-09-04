import { Alert, Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { CodeHighlighter } from '@/components/code-highlighter';

export const ConvertModal = NiceModal.create(({ path }: { path: string }) => {
  const modal = useModal();

  const cmd = `docker run --rm -it \\
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
-y ${path.slice(0, path.lastIndexOf('.'))}_360p.mp4`;

  return (
    <Modal
      title="转换文件"
      open={modal.visible}
      footer={null}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div className="my-4">
        <Alert message="将以下命令拷贝到目标主机上执行" type="info" showIcon />
      </div>
      <div className="flex overflow-auto">
        <CodeHighlighter code={cmd} lang="bash" className="flex-1 w-0" />
      </div>
    </Modal>
  );
});
