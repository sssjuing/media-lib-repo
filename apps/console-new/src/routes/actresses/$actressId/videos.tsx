import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actresses/$actressId/videos')({
  staticData: { name: '演员的相关视频' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /actresses/$actressId/videos!</div>;
}
