import { useMutation } from '@tanstack/react-query';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Button, Card, Popconfirm, message } from 'antd';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitVideoDTO } from '@repo/service';
import { services } from '@/services';
import { VideoForm } from '../-video-form';

export const Route = createFileRoute('/videos/$videoId/edit')({
  staticData: { name: '编辑视频' },
  loader: ({ params: { videoId } }) => services.video.getById(Number(videoId)),
  search: { middlewares: [retainSearchParams(true)] },
  component: RouteComponent,
});

function RouteComponent() {
  const { videoId } = Route.useParams();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();

  const updateMutation = useMutation({
    mutationFn: (values: SubmitVideoDTO) => services.video.update(Number(videoId), values),
    onSuccess: () => {
      message.success('更新成功');
      navigate({ to: '../..', search });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: services.video.delete,
    onSuccess: () => {
      message.success('删除成功');
      navigate({ to: '../..', search });
    },
  });

  const cardTitle = (
    <div>
      编辑视频
      {data.video_url && (
        <a href={data.video_url} target="_blank" rel="noreferrer" className="ml-4 text-xs">
          预览
        </a>
      )}
    </div>
  );

  const cardExtra = (
    <Popconfirm
      placement="topRight"
      title="确认删除？"
      okText="删除"
      okButtonProps={{ danger: true, type: 'primary' }}
      cancelText="取消"
      onConfirm={() => deleteMutation.mutateAsync(Number(videoId))}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}>
      <Card title={cardTitle} extra={cardExtra}>
        <VideoForm
          key={videoId}
          video={data}
          onSubmit={updateMutation.mutate}
          submitting={updateMutation.isPending}
          onBack={() => navigate({ to: '../..', search })}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
