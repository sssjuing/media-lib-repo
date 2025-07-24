import { createFileRoute } from '@tanstack/react-router';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';

export const Route = createFileRoute('/actresses/$actressId/edit')({
  staticData: { name: '编辑演员' },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}>
      Hello &quot;/actresses/$actressId/edit&quot;!
    </PageHeaderWrapper>
  );
}
