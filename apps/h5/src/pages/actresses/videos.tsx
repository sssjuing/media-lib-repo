import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import VideoCard from '@/components/VideoCard';
import { services } from '@/services';

export default function () {
  const { actress_id } = useParams();
  const navigate = useNavigate();

  const { data: actress } = useSWR(`/actresses/${actress_id}`, () =>
    services.actress.getById(Number(actress_id)),
  );
  const { data = [] } = useSWR(`/actresses/${actress_id}/videos`, () =>
    services.actress.listVideos(Number(actress_id)),
  );

  return (
    <PageHeaderWrapper
      title={actress?.unique_name && `${actress.unique_name}的作品`}
      onBack={() => navigate('/actresses')}
    >
      {data.map((i) => (
        <VideoCard key={i.id} video={i} />
      ))}
    </PageHeaderWrapper>
  );
}
