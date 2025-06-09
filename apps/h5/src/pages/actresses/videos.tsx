import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd-mobile';
import { MdEdit } from 'react-icons/md';
import { Video } from '@repo/service';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import VideoCard from '@/components/VideoCard';
import { services } from '@/services';
import { EditTagPopup } from '../videos/EditTagPopup';

export default function ActressVideosPage() {
  const { actress_id } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<Video>();

  const [{ data: actress }, { data: videos = [] }, { data: tags }] = useQueries({
    queries: [
      { queryKey: [`/actresses/${actress_id}`], queryFn: () => services.actress.getById(Number(actress_id)) },
      { queryKey: [`/actresses/${actress_id}/videos`], queryFn: () => services.actress.listVideos(Number(actress_id)) },
      { queryKey: ['/configs/video-tags'], queryFn: services.config.tags },
    ],
  });

  return (
    <PageHeaderWrapper
      title={actress?.unique_name && `${actress.unique_name}的作品`}
      onBack={() => navigate('/actresses')}
    >
      <EditTagPopup
        video={selected}
        tags={tags}
        onSuccess={(v) => {
          const videos = queryClient.getQueryData([`/actresses/${actress_id}/videos`]) as Video[];
          const targetIdx = videos.findIndex((item) => item.id == v.id);
          if (targetIdx !== -1) {
            videos[targetIdx] = v;
            queryClient.setQueryData([`/actresses/${actress_id}/videos`], [...videos]);
          }
          setSelected(undefined);
        }}
        onCancel={() => setSelected(undefined)}
      />
      {videos.map((i) => (
        <VideoCard
          key={i.id}
          video={i}
          extra={
            <Button fill="none" size="small" onClick={() => setSelected(i)}>
              <MdEdit />
            </Button>
          }
        />
      ))}
    </PageHeaderWrapper>
  );
}
