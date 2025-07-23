import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/actresses/create')({
  staticData: { name: '创建演员' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /actresses/create!</div>;
}
