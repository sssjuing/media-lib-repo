import { useMutation } from '@tanstack/react-query';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Card, message } from 'antd';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitVideoDTO } from '@repo/service';
import { services } from '@/services';
import { VideoForm } from './-video-form';

export const Route = createFileRoute('/videos/create')({
  staticData: { name: '创建视频' },
  search: { middlewares: [retainSearchParams(true)] },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();

  const mutation = useMutation({
    mutationFn: services.video.create,
    onSuccess: () => {
      message.success('创建成功');
      setTimeout(() => {
        navigate({ to: '..' });
      }, 1000);
    },
  });

  const handleSubmit = async (values: SubmitVideoDTO) => {
    const v = await services.video.create(values);
    if (v) {
      navigate({ to: '..' });
    }
  };

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}>
      <Card title="创建视频">
        <VideoForm
          onSubmit={handleSubmit}
          submitting={mutation.isPending}
          onBack={() => navigate({ to: '..', search: (prev) => prev })}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
