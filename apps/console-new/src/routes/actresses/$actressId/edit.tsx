import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actresses/$actressId/edit')({
  staticData: { name: '编辑演员' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello &quot;/actresses/$actressId/edit&quot;!</div>;
}
