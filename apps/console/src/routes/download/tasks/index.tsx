import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Table, Tag } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import { GridContent } from '@repo/antd-layout';
import { AnchorBtn } from '@repo/ui';
import { request } from '@/services';
import { DownloadModal } from './-components/DownloadModal';
import { FormModal } from './-components/FormModal';

export const Route = createFileRoute('/download/tasks/')({
  staticData: { name: '下载任务', weight: 1 },
  component: RouteComponent,
});

function RouteComponent() {
  const query = useQuery({
    queryKey: ['resources'],
    queryFn: () => request<ResourceDTO[]>({ method: 'GET', url: '/resources' }),
    refetchInterval: 10000,
  });

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
              title: 'Status',
              render: (_, { downloading, success }) => {
                if (downloading) {
                  return <Tag color="processing">下载中</Tag>;
                }
                if (success) {
                  return <Tag color="success">已完成</Tag>;
                }
                return <Tag>未完成</Tag>;
              },
            },
            {
              title: '操作',
              width: 100,
              render: (_, row) => (
                <AnchorBtn onClick={() => NiceModal.show(DownloadModal, { resourceId: row.id })}>下载状态</AnchorBtn>
              ),
            },
          ]}
          dataSource={query.data}
          loading={query.isPending}
        />
      </Card>
    </GridContent>
  );
}
