import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Divider, Modal, Table, Tag, Tooltip, message } from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import NiceModal from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
// import { Pause, Play } from 'lucide-react';
import { GridContent } from '@repo/antd-layout';
import { AnchorBtn } from '@repo/ui';
import { request } from '@/services';
import { DownloadModal, FormModal } from './-components';

export const Route = createFileRoute('/download/tasks/')({
  staticData: { name: '下载任务', weight: 1 },
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ['resources'],
    queryFn: () => request<ResourceDTO[]>({ method: 'GET', url: '/resources' }),
    select: (data) =>
      data.sort((a, b) => {
        const da = a.created_at ? new Date(a.created_at).getTime() : -Infinity;
        const db = b.created_at ? new Date(b.created_at).getTime() : -Infinity;
        return db - da;
      }),
    refetchInterval: 5000,
  });

  const renderAction = (r: ResourceDTO) => (
    <div className="flex items-center">
      {/* <Tooltip title={r.downloading ? '停止下载' : '加入到下载队列'}>
        <AnchorBtn primary>{r.downloading ? <Pause size={14} /> : <Play size={14} />}</AnchorBtn>
      </Tooltip> */}
      {/* <Divider type="vertical" /> */}
      <Tooltip title="下载状态">
        <AnchorBtn primary onClick={() => NiceModal.show(DownloadModal, { resourceId: r.id })}>
          <SearchOutlined />
        </AnchorBtn>
      </Tooltip>
      <Divider type="vertical" />
      <Tooltip title="删除任务">
        <AnchorBtn
          danger
          onClick={() =>
            Modal.confirm({
              title: '删除下载任务',
              okText: '删除',
              okType: 'danger',
              onOk: async () => {
                await request({ method: 'DELETE', url: `/resources/${r.id}` });
                message.success('已删除');
                query.refetch();
              },
            })
          }
        >
          <DeleteOutlined />
        </AnchorBtn>
      </Tooltip>
    </div>
  );

  return (
    <GridContent>
      <Card>
        <div className="mb-2">
          <Button onClick={() => NiceModal.show(FormModal)}>添加任务</Button>
        </div>
        <Table
          rowKey="id"
          columns={[
            // { title: 'ID', dataIndex: 'id' },
            { title: 'Name', dataIndex: 'name' },
            { title: 'Url', dataIndex: 'url' },
            {
              title: '创建时间',
              dataIndex: 'created_at',
              width: 180,
              render: (val) => (val ? dayjs(val).format('YYYY-MM-DD HH:mm:ss') : '-'),
            },
            {
              title: 'Status',
              dataIndex: 'status',
              render: (_, { status }) => {
                if (status === 'waiting') {
                  return <Tag color="warning">等待中</Tag>;
                } else if (status === 'downloading') {
                  return <Tag color="processing">下载中</Tag>;
                } else if (status === 'success') {
                  return <Tag color="success">已完成</Tag>;
                } else if (status === 'unfinished') {
                  return <Tag>未完成</Tag>;
                }
              },
            },
            {
              title: '操作',
              width: 100,
              render: (_, row) => renderAction(row),
            },
          ]}
          dataSource={query.data}
          loading={query.isPending}
        />
      </Card>
    </GridContent>
  );
}
