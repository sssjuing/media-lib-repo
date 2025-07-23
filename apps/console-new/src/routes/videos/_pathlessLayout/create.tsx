import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/videos/_pathlessLayout/create')({
  staticData: { name: '添加视频' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /videos/create!</div>;
}
