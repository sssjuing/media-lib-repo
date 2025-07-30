import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/assembly-stations')({
  staticData: { name: '装配工位', weight: 1 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/assembly-station!</div>;
}
