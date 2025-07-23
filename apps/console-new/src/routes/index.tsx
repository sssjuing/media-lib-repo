import { HomeOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { GridContent } from '@repo/antd-layout';

export const Route = createFileRoute('/')({
  staticData: {
    name: '首页',
    icon: <HomeOutlined />,
    // roles: ['admin', 'editor'],
  },
  component: Index,
});

function Index() {
  return (
    <GridContent>
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    </GridContent>
  );
}
