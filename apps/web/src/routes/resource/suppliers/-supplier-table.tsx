import { FC, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Modal, Table, TableProps, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { mergeWith } from 'lodash-es';

interface FormModalProps {
  supplier?: SupplierDTO;
  onSubmit?: (
    values: PartialPick<Omit<SupplierDTO, 'id' | 'innerSupplier'>, 'supplierName'>,
  ) => Promise<unknown> | undefined;
}

const FormModal = NiceModal.create(({ supplier, onSubmit }: FormModalProps) => {
  const modal = useModal();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: async (values: PartialPick<Omit<SupplierDTO, 'id' | 'innerSupplier'>, 'supplierName'>) =>
      onSubmit?.({ ...supplier, ...values }),
    onSuccess: () => {
      message.success(`${supplier ? '修改' : '创建'}成功`);
      modal.hide();
    },
  });

  useEffect(() => {
    form.setFieldsValue(supplier);
  }, [form, supplier]);

  return (
    <Modal
      title={`${supplier ? '修改' : '添加'}供应商`}
      onOk={() => form.submit()}
      open={modal.visible}
      okButtonProps={{ loading: mutation.isPending }}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <Form form={form} wrapperCol={{ span: 14 }} labelCol={{ span: 6 }} onFinish={mutation.mutate} className="pt-4!">
        <Form.Item label="供应商名称" name="supplierName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="供应商代号" name="supplierCode">
          <Input />
        </Form.Item>
        <Form.Item label="地址" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="联系人ID" name="contactPersonId">
          <Input />
        </Form.Item>
        <Form.Item label="联系电话" name="phoneNumber">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

interface SupplierTableProps extends Pick<TableProps, 'dataSource' | 'pagination'> {
  title: string;
  inner?: boolean;
  dataSource?: SupplierDTO[];
  onCreate?: (supplier: PartialPick<Omit<SupplierDTO, 'id' | 'innerSupplier'>, 'supplierName'>) => Promise<unknown>;
  onUpdate?: (supplier: SupplierDTO) => Promise<unknown>;
  onDelete?: (supplier: SupplierDTO) => Promise<unknown>;
}

export const SupplierTable: FC<SupplierTableProps> = ({
  title,
  dataSource,
  pagination,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-bold">{title}</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => NiceModal.show(FormModal, { onSubmit: onCreate })}
        >
          新增
        </Button>
      </div>
      <Table
        rowKey="id"
        columns={[
          { title: '编号', dataIndex: 'id' },
          { title: '供应商名称', dataIndex: 'supplierName' },
          { title: '供应商代号', dataIndex: 'supplierCode' },
          { title: '供应商类型', dataIndex: '' },
          { title: '联系人ID', dataIndex: 'contactPersonId' },
          { title: '联系电话', dataIndex: 'phoneNumber' },
          {
            title: '操作',
            render: (row: SupplierDTO) => (
              <div className="space-x-2">
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  size="small"
                  onClick={() =>
                    NiceModal.show(FormModal, {
                      supplier: row,
                      onSubmit: (vals) =>
                        onUpdate?.(mergeWith({}, row, vals, (rowVal, val) => (val === undefined ? rowVal : val))),
                    })
                  }
                />
                <Button
                  icon={<DeleteOutlined />}
                  type="text"
                  danger
                  size="small"
                  onClick={() =>
                    Modal.confirm({
                      title: (
                        <>
                          是否要删除供应商 <em className="text-blue-600">{row.supplierName}</em> &nbsp;的数据项?
                        </>
                      ),
                      okText: '删除',
                      okType: 'danger',
                      okButtonProps: { type: 'primary' },
                      onOk: () => onDelete?.(row),
                    })
                  }
                />
              </div>
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={pagination}
      />
    </>
  );
};
