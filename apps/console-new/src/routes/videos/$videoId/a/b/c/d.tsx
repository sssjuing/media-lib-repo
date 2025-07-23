import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/videos/$videoId/a/b/c/d')({
  staticData: { name: 'abc' },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /a/b/c/d!</div>;
}
