import { useNavigate, useParams } from 'react-router';
import { css } from '@emotion/css';
import { Button, Card, Popconfirm, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitVideoDTO } from '@repo/service';
import { services } from '@/services';
import VideoForm from './VideoForm';

export default function EditVideoPage() {
  const navigate = useNavigate();
  const { video_id } = useParams();

  const query = useQuery({
    queryKey: [`/videos/${video_id}`],
    queryFn: () => services.video.getById(Number(video_id)),
  });

  const updateMutation = useMutation({
    mutationFn: (values: SubmitVideoDTO) => services.video.update(Number(video_id), values),
    onSuccess: () => {
      message.success('更新成功');
      navigate(-1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: services.video.delete,
    onSuccess: () => {
      message.success('删除成功');
      navigate(-1);
    },
  });

  const cardTitle = (
    <div
      className={css`
        a {
          font-size: 12px;
          margin-left: 12px;
        }
      `}
    >
      编辑视频
      {query.data?.video_url && (
        <a href={query.data.video_url} target="_blank" rel="noreferrer">
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
      onConfirm={() => deleteMutation.mutateAsync(Number(video_id))}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title={cardTitle} extra={cardExtra}>
        <VideoForm
          key={video_id}
          video={query.data}
          onSubmit={updateMutation.mutate}
          submitting={updateMutation.isPending}
          onBack={() => navigate(-1)}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
