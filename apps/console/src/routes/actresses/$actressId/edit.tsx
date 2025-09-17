import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Card, Tag, message } from 'antd';
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
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();
  const [changed, setChanged] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (values: SubmitActressDTO) => services.actress.update(Number(actressId), values),
    onSuccess: () => {
      message.success('更新成功');
      setChanged(false);
    },
  });

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}>
      <Card
        title={
          <div className="flex items-center space-x-2">
            <h3>编辑演员</h3>
            {changed && <Tag color="warning">修改未保存</Tag>}
          </div>
        }
      >
        <ActressForm
          key={actressId}
          actress={data}
          onChange={() => setChanged(true)}
          onSubmit={updateMutation.mutate}
          submitting={updateMutation.isPending}
          onBack={() => navigate({ to: '/actresses', search: (prev) => prev })}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
