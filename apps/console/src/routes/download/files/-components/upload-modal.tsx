import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Checkbox, Input, Modal, Tag, message } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
import { useSetState } from 'react-use';
import { request, services } from '@/services';

export interface UploadModalProps {
  path?: string;
}

export const UploadModal = NiceModal.create(({ path }: UploadModalProps) => {
  const filename = path?.split('/').pop();
  const code = filename?.replace(/_\d+p\.mp4$/, '');

  const modal = useModal();
  const [state, setState] = useSetState({
    target: `videos/avs/${dayjs().format('YYYYMM')}/`,
    addToVideoUrl: true,
  });

  const query = useQuery({
    queryKey: ['/videos/paginate', `search=${code}`],
    queryFn: () => services.video.paginate({ page: 1, search: code }),
  });
  const video = query.data?.data[0];

  useEffect(() => {
    setState({ addToVideoUrl: !video?.video_url });
  }, [setState, video?.video_url]);

  const mutation = useMutation({
    mutationFn: async () => {
      await request({
        method: 'POST',
        url: '/files/upload-local-file',
        data: { target_dir: state.target, file_path: path },
      });
      if (state.addToVideoUrl && video) {
        services.video.update(video.id, { ...video, video_path: `${state.target}${filename}` });
      }
    },
    onSuccess: () => {
      message.success('上传成功');
      modal.hide();
    },
    onError: (err) => message.error(err.message),
  });

  return (
    <Modal
      title="上传文件到 MinIO"
      open={modal.visible}
      onOk={() => mutation.mutate()}
      okButtonProps={{ loading: mutation.isPending }}
      onCancel={() => !mutation.isPending && modal.hide()}
      afterClose={() => modal.remove()}
    >
      <p className="mb-1">选择要保存到的 MinIO 路径: </p>
      {`/media-lib/${state.target}${filename}`}
      <Input
        addonBefore="/media-lib/"
        value={state.target}
        onChange={(e) => setState({ target: e.target.value })}
        disabled={mutation.isPending}
      />
      {video && (
        <div>
          <div className="mt-4 mb-2">
            <Checkbox
              checked={state.addToVideoUrl}
              onChange={(e) => setState({ addToVideoUrl: e.target.checked })}
              disabled={mutation.isPending}
            >
              是否将 Minio 的路径添加到视频的路径中
            </Checkbox>
          </div>
          <div className="flex border border-neutral-300 rounded-lg p-2 shadow-md">
            <div className="flex-shrink-0 overflow-hidden">
              <img src={video.cover_url} className="w-40 max-h-40 object-contain" />
            </div>
            <div className="flex-grow pl-2 space-y-1">
              <p className="line-clamp-2" title={video.serial_number + ' ' + (video.chinese_title || video.title)}>
                {video.serial_number} {video.chinese_title || video.title}
              </p>
              <p>
                {video.actresses?.map((a) => (
                  <Tag key={a.id}>{a.unique_name}</Tag>
                ))}
              </p>
              {video.video_url && (
                <p>
                  <span className="text-green-500 mr-1">
                    <CheckCircleFilled />
                  </span>
                  已设置视频地址
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
});
