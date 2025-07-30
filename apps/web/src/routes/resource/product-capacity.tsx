import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/product-capacity')({
  staticData: { name: '产能表', weight: 2 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/product-capacity!</div>;
}
