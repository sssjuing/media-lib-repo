import { TableOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { GridContent } from '@repo/antd-layout';

export const Route = createFileRoute('/models/')({
  staticData: { name: '型号列表', weight: 4, icon: <TableOutlined /> },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GridContent>
      <div className="text-3xl">xx</div>
    </GridContent>
  );
}
