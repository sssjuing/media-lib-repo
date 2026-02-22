import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Form, Input, Modal, message } from 'antd';
import { DragSortTable } from '@ant-design/pro-components';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { GridContent } from '@repo/antd-layout';
import { VideoTag } from '@repo/service';
import { services } from '@/services';
import { getRandomInt } from '@/utils/utils';

interface FormModalProps {
  tag?: VideoTag;
  maxRank?: number;
  onSuccess?: () => void;
}

const FormModal = NiceModal.create(({ tag, maxRank = 100, onSuccess }: FormModalProps) => {
  const modal = useModal();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (values: Pick<VideoTag, 'name'>) => {
      if (tag) {
        return services.videoTag.update({ ...tag, ...values });
      }
      return services.videoTag.create({ ...values, rank: maxRank + getRandomInt(10, 100) });
    },
    onSuccess: () => {
      message.success(`${tag ? '编辑' : '添加'}标签成功`);
      onSuccess?.();
      modal.hide();
    },
  });

  useEffect(() => {
    if (tag) form.setFieldsValue(tag);
  }, [form, tag]);

  return (
    <Modal
      title={`${tag ? '编辑' : '添加'}标签`}
      open={modal.visible}
      onCancel={modal.hide}
      onOk={() => form.submit()}
      afterClose={modal.remove}
    >
      <Form form={form} layout="vertical" onFinish={mutation.mutate}>
        <Form.Item name="name" label="标签名称" rules={[{ required: true, message: '请输入标签名称' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export const Route = createFileRoute('/settings/tags')({
  staticData: { name: 'Tags' },
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({ queryKey: ['/video-tags'], queryFn: services.videoTag.list });

  const maxRank = query.data?.reduce((max, tag) => Math.max(max, tag.rank), 0) || 0;

  const handleDragSortEnd = async (beforeIndex: number, afterIndex: number) => {
    const tags = (query.data || []) as (VideoTag | undefined)[];
    const source = tags[beforeIndex];
    const target = tags[afterIndex];
    if (!source || !target) return;
    console.log(source, target);
    let rank = target.rank;
    if (beforeIndex > afterIndex) {
      const prevRank = tags[afterIndex - 1]?.rank || target.rank - 100;
      rank = (target.rank + prevRank) / 2;
    } else {
      const nextRank = tags[afterIndex + 1]?.rank || target.rank + 100;
      rank = (target.rank + nextRank) / 2;
    }
    await services.videoTag.update({ ...source, rank });
    query.refetch();
    message.success('排序成功');
  };

  return (
    <GridContent>
      <Card
        title="视频标签管理"
        extra={
          <Button type="primary" onClick={() => NiceModal.show(FormModal, { maxRank, onSuccess: query.refetch })}>
            添加标签
          </Button>
        }
      >
        <DragSortTable
          rowKey="id"
          columns={[
            { title: '排序', dataIndex: 'sort', width: 60 },
            { title: '标签名称', dataIndex: 'name' },
            { title: '标签排名', dataIndex: 'rank' },
            {
              title: '操作',
              width: 120,
              render: (_, tag) => (
                <div className="space-x-2">
                  <Button
                    type="link"
                    size="small"
                    onClick={() => NiceModal.show(FormModal, { tag, onSuccess: query.refetch })}
                    style={{ padding: 0 }}
                  >
                    编辑
                  </Button>
                  <Button
                    type="link"
                    danger
                    size="small"
                    onClick={() =>
                      Modal.confirm({
                        title: '确认删除标签吗？',
                        okText: '删除',
                        okType: 'danger',
                        onOk: async () => {
                          await services.videoTag.delete(tag.id);
                          query.refetch();
                          message.success('删除标签成功');
                        },
                      })
                    }
                    style={{ padding: 0 }}
                  >
                    删除
                  </Button>
                </div>
              ),
            },
          ]}
          dataSource={query.data}
          pagination={false}
          search={false}
          options={false}
          dragSortKey="sort"
          onDragSortEnd={handleDragSortEnd}
        />
      </Card>
    </GridContent>
  );
}
