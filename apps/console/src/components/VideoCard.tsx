import { FC } from 'react';
import { Link, useParams } from 'react-router';
import { css } from '@emotion/css';
import { Button, Image, Tag } from 'antd';
import { EditOutlined, VideoCameraTwoTone } from '@ant-design/icons';
import { Actress, Video, getAge } from '@repo/service';

interface VideoCardProps {
  video: Video;
}

const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const { actress_id } = useParams();

  const renderActressTagContent = (a: Actress) => {
    const text = `${a.unique_name}${(video.release_date && ` ${getAge(a.birth_date, video.release_date)}`) || ''}`;
    if (Number(actress_id) === a.id) {
      return text;
    }
    return <Link to={`/actresses/${a.id}/videos`}>{text}</Link>;
  };

  return (
    <div
      className={css`
        background-color: #fff;
      `}
    >
      <Image
        src={video.cover_url || 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
        style={{ objectFit: 'cover' }}
      />
      <div
        className={css`
          padding: 12px;
        `}
      >
        <div>
          <div
            className={css`
              display: flex;
              margin-right: auto;
              > div:first-of-type {
                flex: 1;
                color: #999;
                margin-right: 12px;
              }
              .buttons {
                margin-left: auto;
              }
            `}
          >
            <div>{video.serial_number}</div>
            <div className="buttons">
              {video.video_url && (
                <Button type="text" size="small" onClick={() => open(video.video_url)}>
                  <VideoCameraTwoTone />
                </Button>
              )}
              <Button type="text" size="small">
                <Link to={`/videos/${video.id}/edit`}>
                  <EditOutlined style={{ color: '#999' }} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div
          className={css`
            > div {
              display: flex;
              margin-right: 12px;
              :not(:last-of-type) {
                margin-bottom: 4px;
              }
              .label {
                margin-right: 6px;
              }
              .label::after {
                content: ':';
                margin-left: 2px;
              }
            }
          `}
        >
          <div>
            <div className="label">片名{video.chinese_title && '(中)'}</div>
            <div
              className={css`
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              `}
            >
              {video.chinese_title || video.title}
            </div>
          </div>
          <div>
            <div className="label">演员</div>
            <div className="tags">
              {video.actresses?.map((a) => <Tag key={a.id}>{renderActressTagContent(a)}</Tag>)}
            </div>
          </div>
          <div>
            <div className="label">Tags</div>
            <div className="tags">
              {!video.mosaic && <Tag color="orange">无码</Tag>}
              {video.tags?.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
