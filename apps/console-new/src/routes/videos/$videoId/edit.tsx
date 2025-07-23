import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/videos/$videoId/edit')({
  staticData: { name: '编辑视频' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /videos/$videoId/edit!</div>;
}
