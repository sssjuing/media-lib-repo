import { createFileRoute } from '@tanstack/react-router';
import { Breadcrumb } from '@repo/antd-layout';

export const Route = createFileRoute('/resource/suppliers/inside')({
  staticData: { name: '内部供应商', weight: 2 },
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
