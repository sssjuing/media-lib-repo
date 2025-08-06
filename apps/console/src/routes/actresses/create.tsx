import { useMutation } from '@tanstack/react-query';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Card, message } from 'antd';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { services } from '@/services';
import { ActressForm } from './-actress-form';

export const Route = createFileRoute('/actresses/create')({
  staticData: { name: '创建演员' },
  search: { middlewares: [retainSearchParams(true)] },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const mutation = useMutation({
    mutationFn: services.actress.create,
    onSuccess: () => {
      message.success('创建成功');
      navigate({ to: '..' });
    },
  });

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}>
      <Card title="创建演员">
        <ActressForm
          onSubmit={mutation.mutate}
          submitting={mutation.isPending}
          onBack={() => navigate({ to: '..', search: (prev) => prev })}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
