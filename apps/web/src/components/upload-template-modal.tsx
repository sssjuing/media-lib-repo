import { Modal, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { create, useModal } from '@ebay/nice-modal-react';

const { Dragger } = Upload;

interface UploadTemplateModalProps {
  title: string;
  onOk?: () => void;
}

export const UploadTemplateModal = create(({ title }: UploadTemplateModalProps) => {
  const modal = useModal();

  return (
    <Modal
      title={title}
      // onOk={}
      open={modal.visible}
      // okButtonProps={{ loading: mutation.isPending }}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
      footer={null}
    >
      <Dragger>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          将文件拖拽到此处, 或<span className="antd-primary">点击上传</span>
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
        </p>
      </Dragger>
    </Modal>
  );
});
