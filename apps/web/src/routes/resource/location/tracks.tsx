import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/tracks')({
  staticData: { name: '导轨', weight: 4 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/track!</div>;
}
