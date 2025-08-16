import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Modal, message } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { request } from '@/services';

export const FormModal = NiceModal.create(() => {
  const modal = useModal();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (vals) => request({ method: 'POST', url: '/download', data: vals }),
    onSuccess: () => {
      message.success('添加成功');
      modal.hide();
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <Modal
      title="添加下载任务"
      onOk={() => form.submit()}
      open={modal.visible}
      okButtonProps={{ loading: mutation.isPending }}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <Form
        form={form}
        wrapperCol={{ span: 18 }}
        labelCol={{ span: 4 }}
        onFinish={mutation.mutate}
        className="pt-4!"
        requiredMark={false}
      >
        <Form.Item label="文件名称" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="URL" name="url" rules={[{ required: true }, { type: 'url', warningOnly: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});
