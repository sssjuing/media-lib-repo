import { VideoCameraOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/videos/_pathlessLayout/')({
  staticData: { name: '视频', icon: <VideoCameraOutlined />, hideChildrenInMenu: false },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/videos/&quot;!</div>;
}
