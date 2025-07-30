import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/teams')({
  staticData: { name: '班组管理', weight: 6 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/teams!</div>;
}
