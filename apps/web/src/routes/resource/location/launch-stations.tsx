import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/launch-stations')({
  staticData: { name: '发射工位', weight: 3 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/launch-station!</div>;
}
