import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/inventories')({
  staticData: { name: '库存物料', weight: 8 },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /resource/inventories!</div>;
}
