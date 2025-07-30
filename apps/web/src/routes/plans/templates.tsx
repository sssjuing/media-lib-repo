import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/plans/templates')({
  staticData: { name: '计划模板' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /plans/templates!</div>;
}
