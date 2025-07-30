import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/equipment/equipment')({
  staticData: { name: '设备管理', weight: 2 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/equipment/equipment!</div>;
}
