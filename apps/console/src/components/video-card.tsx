import { FC } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { Button, Image, Tag } from 'antd';
import { EditOutlined, VideoCameraTwoTone } from '@ant-design/icons';
import { Actress, Video, getAge } from '@repo/service';

function getAgeColor(age: number) {
  if (age >= 45) return '#ff3141';
  if (age >= 40) return 'red';
  if (age >= 35) return 'volcano';
  if (age >= 30) return 'gold';
  if (age >= 25) return 'blue';
  if (age >= 20) return 'green';
  if (age >= 18) return 'purple';
  return '';
}

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
  return (
    <div className="bg-white">
      <Image
        src={video.cover_url || 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
        className="object-cover"
      />
      <div className="p-3">
        <div>
          <div className="flex items-center">
            <div className="flex-1 text-neutral-400">{video.serial_number}</div>
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
            <div className="flex-1 truncate">{video.chinese_title || video.title}</div>
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
