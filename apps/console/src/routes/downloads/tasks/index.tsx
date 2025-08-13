import { createFileRoute } from '@tanstack/react-router';
import { Button, Card, Table } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import { GridContent } from '@repo/antd-layout';
import { FormModal } from './-components';

export const Route = createFileRoute('/downloads/tasks/')({
  staticData: { name: '下载任务', weight: 1 },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GridContent>
      <Card>
        <div className="mb-2">
          <Button onClick={() => NiceModal.show(FormModal)}>添加任务</Button>
        </div>
        <Table />
      </Card>
    </GridContent>
  );
}
