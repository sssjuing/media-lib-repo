import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, InfiniteScroll, Picker, Popup, Selector, Toast } from 'antd-mobile';
import { MdEdit } from 'react-icons/md';
import { Video } from '@repo/service';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import VideoCard from '@/components/VideoCard';
import { useScroll } from '@/hooks/useScroll';
import { services } from '@/services';

interface EditTagPopupProps {
  video?: Video;
  tags?: string[];
  onSuccess?: (video: Video) => void;
  onCancel?: () => void;
}

const EditTagPopup: FC<EditTagPopupProps> = ({ video, tags = [], onSuccess, onCancel }) => {
  const [selected, setSelected] = useState<string[]>(video?.tags ?? []);

  const mutation = useMutation({
    mutationFn: () => services.video.update(Number(video!.id), { actresses: video!.actresses, tags: selected }),
    onSuccess: (v) => {
      onSuccess?.(v);
      Toast.show({
        icon: 'success',
        content: '更新成功',
      });
    },
    onError: (e) => {
      console.error(e);
      Toast.show({
        icon: 'fail',
        content: '更新失败',
      });
    },
  });

  useEffect(() => {
    setSelected(video?.tags ?? []);
  }, [video]);

  return (
    <Popup visible={!!video} onMaskClick={onCancel}>
      <div className="flex items-center justify-between p-1 border-b-1 border-neutral-800">
        <a onClick={onCancel} className="p-2 text-[15px]">
          取消
        </a>
        <a onClick={() => mutation.mutate()} className="p-2 text-[15px]">
          确定
        </a>
      </div>
      <div className="p-2 min-h-20 max-h-100 overflow-y-auto">
        <Selector
          columns={4}
          options={tags.map((tag) => ({ label: tag, value: tag }))}
          value={selected}
          multiple
          onChange={(arr) => setSelected(arr)}
        />
      </div>
    </Popup>
  );
};

export default function VideosIndexPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tag = searchParams.get('tag') ?? '';

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState<Video>();

  const tagsQuery = useQuery({ queryKey: ['/configs/video-tags'], queryFn: services.config.tags });
  const videosQuery = useQuery({
    queryKey: ['/videos', tag],
    queryFn: () => services.video.list({ tags: tag ? [tag] : undefined }),
  });

  const { data: videoList, loadMore, hasMore } = useScroll(videosQuery.data);

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
      {videoList.map((i) => (
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
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </PageHeaderWrapper>
  );
}
