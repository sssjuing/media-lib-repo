import { useMutation } from '@tanstack/react-query';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Card, message } from 'antd';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitActressDTO } from '@repo/service';
import { services } from '@/services';
import { ActressForm } from '../-actress-form';

export const Route = createFileRoute('/actresses/$actressId/edit')({
  staticData: { name: '编辑演员' },
  loader: ({ params: { actressId } }) => services.actress.getById(Number(actressId)),
  search: { middlewares: [retainSearchParams(true)] },
  component: RouteComponent,
});

function RouteComponent() {
  const { actressId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();

  const updateMutation = useMutation({
    mutationFn: (values: SubmitActressDTO) => services.actress.update(Number(actressId), values),
    onSuccess: () => {
      message.success('更新成功');
      navigate({ to: '/actresses', search });
    },
  });

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}>
      <Card title="编辑演员">
        <ActressForm
          key={actressId}
          actress={data}
          onSubmit={updateMutation.mutate}
          submitting={updateMutation.isPending}
          onBack={() => navigate({ to: '/actresses', search })}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
