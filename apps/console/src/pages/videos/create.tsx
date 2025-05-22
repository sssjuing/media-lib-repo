import { useNavigate } from 'react-router';
import { Card } from 'antd';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitVideoDTO } from '@repo/service';
import { services } from '@/services';
import VideoForm from './VideoForm';

export default function CreateVideoPage() {
  const navigate = useNavigate();

  const handleSubmit = async (values: SubmitVideoDTO) => {
    const v = await services.video.create(values);
    if (v) {
      navigate('/videos');
    }
  };

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title="创建视频">
        <VideoForm onSubmit={handleSubmit} onBack={() => navigate('/videos')} />
      </Card>
    </PageHeaderWrapper>
  );
}
