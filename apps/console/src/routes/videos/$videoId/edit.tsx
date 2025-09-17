import { useMutation } from '@tanstack/react-query';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Button, Card, Popconfirm, Tag, message } from 'antd';
import { useSetState } from 'react-use';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitVideoDTO, Video } from '@repo/service';
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
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();
  const [state, setState] = useSetState<{ changed: boolean; video?: Video }>({ changed: false });

  const updateMutation = useMutation({
    mutationFn: (values: SubmitVideoDTO) => services.video.update(Number(videoId), values),
    onSuccess: (video) => {
      message.success('更新成功');
      setState({ changed: false, video });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: services.video.delete,
    onSuccess: () => {
      message.success('删除成功');
      setTimeout(() => {
        navigate({ to: '../..', search: (prev) => prev });
      }, 1000);
    },
  });

  const cardTitle = (
    <div className="flex items-center space-x-2">
      <h3>编辑视频</h3>
      {state.changed && <Tag color="warning">修改未保存</Tag>}
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
          video={state.video || data}
          onChange={() => setState({ changed: true })}
          onSubmit={updateMutation.mutate}
          submitting={updateMutation.isPending}
          onBack={() => navigate({ to: '../..', search: (prev) => prev })}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
