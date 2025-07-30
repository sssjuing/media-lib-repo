import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/equipment/templates')({
  staticData: { name: '设备模板', weight: 1 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/equipment/templates!</div>;
}
