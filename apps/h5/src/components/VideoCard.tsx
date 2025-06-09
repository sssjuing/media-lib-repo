import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Grid, Image, Tag } from 'antd-mobile';
import { MdOndemandVideo } from 'react-icons/md';
import { Actress, Video, getAge, getAgeColor } from '@repo/service';

const ActressRenderer: FC<{ actress: Actress; video: Video }> = ({ actress, video }) => {
  const navigate = useNavigate();
  const age = video.release_date && getAge(actress.birth_date, video.release_date);

  return (
    <div onClick={() => navigate(`/actresses/${actress.id}/content`)} className="p-1 border-1 border-neutral-600">
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">{actress.unique_name}</div>
      <div className="flex items-center mt-0.5">
        <span className="mr-2 text-neutral-400">出演年龄:</span>
        {age && (
          <Tag color={getAgeColor(age)} fill="outline">
            {age}
          </Tag>
        )}
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: Video;
  extra?: ReactNode;
}

const VideoCard: FC<VideoCardProps> = ({ video, extra }) => {
  return (
    <div className="mb-8 bg-neutral-900">
      <Image
        src={video.cover_url}
        alt="cover"
        onClick={() => {
          if (video.video_url) {
            open(video.video_url);
          }
        }}
      />
      <div className="p-2 space-y-1">
        <div className="flex items-center">
          <div>
            <div className="flex items-center space-x-1">
              <div>{video.serial_number}</div>
              {video.video_url && (
                <div className="text-lg leading-4">
                  <MdOndemandVideo />
                </div>
              )}
            </div>
            <div className="space-x-1">{video.tags?.map((i) => <Tag key={i}>{i}</Tag>)}</div>
          </div>
          {extra && <div className="ml-auto">{extra}</div>}
        </div>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis text-neutral-400">
          {video.chinese_title || video.title}
        </div>

        <Grid columns={3} gap="0.5rem">
          {video.actresses?.map((i) => (
            <Grid.Item key={i.id}>
              <ActressRenderer actress={i} video={video} />
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default VideoCard;
