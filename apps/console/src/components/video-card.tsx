import { FC } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { Button, Image, Tag } from 'antd';
import { EditOutlined, VideoCameraTwoTone } from '@ant-design/icons';
import NiceModal from '@ebay/nice-modal-react';
import { Actress, Video, getAge } from '@repo/service';
import { AnchorBtn } from '@repo/ui';
import { getAgeColor } from '@/utils/utils';
import { VideoDetailModal } from './video-detail-modal';

interface ActressTagProps {
  actress: Actress;
  video: Video;
}

const ActressTag: FC<ActressTagProps> = ({ actress, video }) => {
  const { actressId } = useParams({ strict: false });

  const age = video.release_date && getAge(actress.birth_date, video.release_date);
  const text = !age ? actress.unique_name : `${actress.unique_name} ${age}`;

  if (Number(actressId) === actress.id) {
    return <Tag color={age ? getAgeColor(age) : undefined}>{text}</Tag>;
  }

  return (
    <Link to="/actresses/$actressId/videos" params={{ actressId: actress.id.toString() }}>
      <Tag color={age ? getAgeColor(age) : undefined}>{text}</Tag>
    </Link>
  );
};

interface VideoCardProps {
  video: Video;
}

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const title = video.chinese_title || video.title;

  return (
    <div className="bg-white">
      <Image
        src={video.cover_url || 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
        className="object-contain aspect-[40/27]"
      />
      <div className="p-3">
        <div>
          <div className="flex items-center">
            <div className="flex-1">
              <AnchorBtn onClick={() => NiceModal.show(VideoDetailModal, { video })}>{video.serial_number}</AnchorBtn>
            </div>
            <div>
              {video.video_url && (
                <Button type="text" size="small" onClick={() => open(video.video_url)}>
                  <VideoCameraTwoTone />
                </Button>
              )}
              <Button type="text" size="small">
                <Link to="/videos/$videoId/edit" params={{ videoId: video.id.toString() }}>
                  <EditOutlined style={{ color: '#999' }} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex mr-3 mb-1">
            <div className="mr-2 after:content-[':'] after:ml-0.5">片名{video.chinese_title && '(中)'}</div>
            <div className="flex-1 truncate" title={title}>
              {title}
            </div>
          </div>
          <div className="flex mr-3 mb-1">
            <div className="mr-2 after:content-[':'] after:ml-0.5">演员</div>
            <div className="">
              {video.actresses?.map((a) => (
                <ActressTag key={a.id} actress={a} video={video} />
              ))}
            </div>
          </div>
          <div className="flex mr-3">
            <div className="mr-2 after:content-[':'] after:ml-0.5">Tags</div>
            <div className="tags">
              {!video.mosaic && <Tag color="orange">无码</Tag>}
              {video.tags?.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
