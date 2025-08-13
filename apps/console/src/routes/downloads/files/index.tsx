import { createFileRoute } from '@tanstack/react-router';
import { Card, Table } from 'antd';
import { GridContent } from '@repo/antd-layout';
import { request } from '@/services';

export const Route = createFileRoute('/downloads/files/')({
  staticData: { name: '下载文件', weight: 2 },
  loader: () => request<{ path: string; size: number }[]>({ method: 'GET', url: '/downloads/files' }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <GridContent>
      <Card>
        <Table
          rowKey="path"
          columns={[
            { title: '路径', dataIndex: 'path' },
            { title: '大小', dataIndex: 'size', render: (val) => (val / 1024 / 1024).toFixed(2) + ' MB' },
          ]}
          dataSource={data}
        />
      </Card>
    </GridContent>
  );
}
