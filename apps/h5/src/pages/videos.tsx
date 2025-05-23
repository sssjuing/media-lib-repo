import { useQuery } from '@tanstack/react-query';
import { InfiniteScroll } from 'antd-mobile';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import VideoCard from '@/components/VideoCard';
import { useScroll } from '@/hooks/useScroll';
import { services } from '@/services';

export default function VideosIndexPage() {
  const { data } = useQuery({ queryKey: ['/videos'], queryFn: () => services.video.list({}) });
  const { data: videoList, loadMore, hasMore } = useScroll(data);

  return (
    <PageHeaderWrapper title="视频列表" backIcon={false}>
      {videoList.map((i) => (
        <VideoCard key={i.id} video={i} />
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </PageHeaderWrapper>
  );
}
