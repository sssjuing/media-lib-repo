import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/equipment-stations')({
  staticData: { name: '设备工位', weight: 2 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/equipment-station!</div>;
}
