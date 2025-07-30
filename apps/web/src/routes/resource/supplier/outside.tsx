import { createFileRoute } from '@tanstack/react-router';
import { Breadcrumb } from '@repo/antd-layout';

export const Route = createFileRoute('/resource/supplier/outside')({
  staticData: { name: '外部供应商' },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <div>
      <Breadcrumb onClick={(key) => navigate({ to: key })} />
      Hello /resource/supplier/outside!
    </div>
  );
}
