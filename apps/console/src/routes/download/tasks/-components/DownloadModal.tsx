import { useMutation, useQuery } from '@tanstack/react-query';
import { cx } from '@emotion/css';
import { Button, Modal, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { request } from '@/services';

interface DownloadModalProps {
  resourceId: string;
}

export const DownloadModal = NiceModal.create(({ resourceId }: DownloadModalProps) => {
  const modal = useModal();
  const query = useQuery({
    queryKey: ['resources', resourceId, 'segments'],
    queryFn: () => request<SegmentDTO[]>({ method: 'GET', url: `/resources/${resourceId}/segments` }),
    refetchInterval: 1000,
  });

  const mutation = useMutation({
    mutationFn: () => request({ method: 'POST', url: `/resources/${resourceId}/download` }),
    onSuccess: () => {
      message.success('已重新加入到下载队列');
    },
  });

  return (
    <Modal
      title="下载状态"
      width={800}
      open={modal.visible}
      onCancel={modal.hide}
      footer={null}
      afterClose={() => modal.remove()}
    >
      <div className="flex flex-wrap  gap-1">
        {query.data?.map(({ s }, idx) => (
          <div key={idx} className={cx('w-2 h-2 bg-slate-400', { 'bg-green-400!': s == 1, 'bg-red-500!': s == -1 })} />
        ))}
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <Button type="primary" icon={<ReloadOutlined />} onClick={() => mutation.mutate()}>
          重试
        </Button>
      </div>
    </Modal>
  );
});
