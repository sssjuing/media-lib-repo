import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/storage-areas')({
  staticData: { name: '仓储区', weight: 5 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /location/storage-area!</div>;
}
