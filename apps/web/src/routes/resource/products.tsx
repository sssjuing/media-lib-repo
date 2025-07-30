import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/products')({
  staticData: { name: '产品管理', weight: 5 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/products!</div>;
}
