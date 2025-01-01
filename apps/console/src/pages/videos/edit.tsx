import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';
import { Button, Card, message, Popconfirm } from 'antd';
import useSWR from 'swr';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitVideoDTO } from '@repo/service';
import { services } from '@/services';
import VideoForm from './VideoForm';

export default function () {
  const navigate = useNavigate();
  const { video_id } = useParams();

  const { data } = useSWR(`/videos/${video_id}`, () => services.video.getById(Number(video_id)));

  const handleSubmit = async (values: SubmitVideoDTO) => {
    const v = await services.video.update(Number(video_id), values);
    if (v) {
      navigate('/videos');
    }
  };

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
      {data?.video_url && (
        <a href={data.video_url} target="_blank" rel="noreferrer">
          预览
        </a>
      )}
    </div>
  );

  const cardExtra = (
    <Popconfirm
      title="确认删除？"
      okText="删除"
      okButtonProps={{ danger: true, type: 'primary' }}
      cancelText="取消"
      onConfirm={async () => {
        const { ok } = await services.video.delete(Number(video_id));
        if (ok) {
          message.success('删除成功');
          navigate('/videos');
        }
      }}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title={cardTitle} extra={cardExtra}>
        <VideoForm key={video_id} onSubmit={handleSubmit} video={data} />
      </Card>
    </PageHeaderWrapper>
  );
}
