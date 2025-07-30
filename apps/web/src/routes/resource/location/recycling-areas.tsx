import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/recycling-areas')({
  staticData: { name: '回收区', weight: 7 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/recycling-area!</div>;
}
