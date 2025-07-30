import { createFileRoute } from '@tanstack/react-router';
import { Breadcrumb } from '@repo/antd-layout';

export const Route = createFileRoute('/resource/supplier/inside')({
  staticData: { name: '内部供应商' },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <div>
      <Breadcrumb onClick={(key) => navigate({ to: key })} />
      Hello &quot;/resource/supplier/inside&quot;!
    </div>
  );
}
