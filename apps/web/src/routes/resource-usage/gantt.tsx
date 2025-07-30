import { createFileRoute } from '@tanstack/react-router';
import { Breadcrumb, GridContent } from '@repo/antd-layout';

export const Route = createFileRoute('/resource-usage/gantt')({
  staticData: { name: '资源占用' },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <GridContent>
      <Breadcrumb onClick={(key) => navigate({ to: key })} />
      Hello /resource-usage/gantt!
    </GridContent>
  );
}
