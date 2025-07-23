import { UserOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actresses/')({
  staticData: { name: '演员', icon: <UserOutlined /> },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/actresses/&quot;!</div>;
}
