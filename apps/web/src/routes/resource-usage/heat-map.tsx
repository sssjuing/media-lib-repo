import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource-usage/heat-map')({
  staticData: { name: '资源负载热力图' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource-usage/heat-map!</div>;
}
