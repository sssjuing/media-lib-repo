import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/factories')({
  staticData: { name: '厂房', weight: 4 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/factory!</div>;
}
