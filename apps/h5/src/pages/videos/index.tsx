import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, InfiniteScroll, Picker } from 'antd-mobile';
import { MdEdit } from 'react-icons/md';
import { Video } from '@repo/service';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import VideoCard from '@/components/VideoCard';
import { services } from '@/services';
import { EditTagPopup } from './EditTagPopup';

export default function VideosIndexPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tag = searchParams.get('tag') ?? '';

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<Video>();

  const tagsQuery = useQuery({ queryKey: ['/configs/video-tags'], queryFn: services.config.tags });

  const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ['/videos/paginate', tag],
    queryFn: async ({ pageParam }) => {
      const { data } = await services.video.paginate({ tags: tag ? [tag] : undefined, page: pageParam });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => (lastPage.length === 0 ? undefined : pages.length + 1),
  });

  return (
    <PageHeaderWrapper
      title="视频列表"
      backIcon={false}
      right={
        <Picker
          columns={[tagsQuery.data ?? [].map((tag) => ({ label: tag, value: tag }))]}
          onConfirm={(v) => navigate(`.?tag=${v[0]}`)}
        >
          {(_, actions) => (
            <Button fill="none" size="small" onClick={actions.open}>
              Tag筛选
            </Button>
          )}
        </Picker>
      }
    >
      <EditTagPopup
        video={selected}
        tags={tagsQuery.data}
        onSuccess={(v) => {
          const videos = queryClient.getQueryData(['/videos', tag]) as Video[];
          const targetIdx = videos.findIndex((item) => item.id == v.id);
          if (targetIdx !== -1) {
            videos[targetIdx] = v;
            queryClient.setQueryData(['/videos', tag], [...videos]);
          }
          setSelected(undefined);
        }}
        onCancel={() => setSelected(undefined)}
      />
      {data?.pages.flat().map((i) => (
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
      <InfiniteScroll
        loadMore={async () => {
          await fetchNextPage();
        }}
        hasMore={hasNextPage}
      />
    </PageHeaderWrapper>
  );
}
