import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/videos/_pathlessLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div>_pathlessLayout!</div>
      <Outlet />
    </>
  );
}
