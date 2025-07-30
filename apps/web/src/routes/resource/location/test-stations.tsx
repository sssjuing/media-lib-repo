import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/test-stations')({
  staticData: { name: '试验工位', weight: 6 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/test-station!</div>;
}
