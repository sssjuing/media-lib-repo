import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Input, Modal, message } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { request } from '@/services';

export interface BatchCopyModalProps {
  paths?: string[];
}

export const BatchCopyModal = NiceModal.create(({ paths = [] }: BatchCopyModalProps) => {
  const modal = useModal();
  // const [state, setState] = useImmer({ target: '' });
  const [target, setTarget] = useState('');

  const mutation = useMutation({
    mutationFn: () => request({ method: 'POST', url: '/files/copy', data: { paths, target_dir: target } }),
    onSuccess: () => {
      message.success('复制成功');
      modal.hide();
    },
    onError: (err) => message.error(err.message),
  });

  return (
    <Modal
      title="批量复制文件到指定目录"
      open={modal.visible}
      onOk={() => mutation.mutate()}
      okButtonProps={{ loading: mutation.isPending, disabled: paths?.length === 0 || !target }}
      onCancel={() => !mutation.isPending && modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <div className="my-4 px-4 py-2 border-1 border-blue-400 bg-blue-100 rounded-md  hover:shadow-md shadow-blue-300 transition-shadow">
          <div className="font-medium mb-1">以下文件将被复制到指定目录:</div>
          <ul className="space-y-1">
            {paths?.map((p) => (
              <li key={p} className="px-2 text-neutral-500 flex justify-between hover:bg-blue-200">
                <span className="truncate">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mb-1">请输入目标路径：</p>
        <Input value={target} onChange={(e) => setTarget(e.target.value)} disabled={mutation.isPending} />
      </div>
    </Modal>
  );
});
