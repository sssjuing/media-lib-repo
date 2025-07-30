import { HomeOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { GridContent } from '@repo/antd-layout';

export const Route = createFileRoute('/home')({
  staticData: { name: '首页', weight: 0, icon: <HomeOutlined />, hideInMenu: true },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GridContent>
      <div className="text-3xl">Home Page</div>
    </GridContent>
  );
}
