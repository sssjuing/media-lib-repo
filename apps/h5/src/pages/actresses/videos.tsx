import { useNavigate, useParams } from 'react-router';
import { useQueries } from '@tanstack/react-query';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import VideoCard from '@/components/VideoCard';
import { services } from '@/services';

export default function ActressVideosPage() {
  const { actress_id } = useParams();
  const navigate = useNavigate();

  const [{ data: actress }, { data: videos = [] }] = useQueries({
    queries: [
      { queryKey: [`/actresses/${actress_id}`], queryFn: () => services.actress.getById(Number(actress_id)) },
      { queryKey: [`/actresses/${actress_id}/videos`], queryFn: () => services.actress.listVideos(Number(actress_id)) },
    ],
  });

  return (
    <PageHeaderWrapper
      title={actress?.unique_name && `${actress.unique_name}的作品`}
      onBack={() => navigate('/actresses')}
    >
      {videos.map((i) => (
        <VideoCard key={i.id} video={i} />
      ))}
    </PageHeaderWrapper>
  );
}
