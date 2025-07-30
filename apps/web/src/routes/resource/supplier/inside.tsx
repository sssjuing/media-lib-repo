import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/supplier/inside')({
  staticData: { name: '内部供应商' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/resource/supplier/inside&quot;!</div>;
}
