import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Grid, Image, Tag } from 'antd-mobile';
import { MdOndemandVideo } from 'react-icons/md';
import { Actress, Video, getAge, getAgeColor } from '@repo/service';

const ActressRenderer: FC<{ actress: Actress; video: Video }> = ({ actress, video }) => {
  const navigate = useNavigate();
  const age = video.release_date && getAge(actress.birth_date, video.release_date);

  return (
    <div
      onClick={() => navigate(`/actresses/${actress.id}/content`)}
      className={css`
        padding: 0.3rem;
        border: 1px solid var(--adm-color-light);
      `}
    >
      <div
        className={css`
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      >
        {actress.unique_name}
      </div>
      <div
        className={css`
          display: flex;
          align-items: center;
          margin-top: 0.2rem;
        `}
      >
        <span
          className={css`
            margin-right: 0.5rem;
            color: var(--adm-color-weak);
          `}
        >
          出演年龄:
        </span>
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
    <div
      className={css`
        margin-bottom: 2rem;
        background: var(--adm-color-background);
      `}
    >
      <Image
        src={video.cover_url}
        alt="cover"
        onClick={() => {
          if (video.video_url) {
            open(video.video_url);
          }
        }}
      />
      <div
        className={css`
          padding: 0.5rem;
        `}
      >
        <div
          className={css`
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
          `}
        >
          <div
            className={css`
              min-width: 0;
              flex: 1;
              > div:first-of-type {
                margin-bottom: 0.3rem;
              }
            `}
          >
            <div
              className={css`
                display: flex;
                align-items: center;
                > div:not(:last-of-type) {
                  margin-right: 0.3rem;
                  line-height: 1rem;
                }
              `}
            >
              <div>{video.serial_number}</div>
              {video.video_url && (
                <div
                  className={css`
                    font-size: 1rem;
                    line-height: 0 !important;
                  `}
                >
                  <MdOndemandVideo />
                </div>
              )}
              <div
                className={css`
                  span:not(:last-of-type) {
                    margin-right: 0.2rem;
                  }
                `}
              >
                {video.tags?.map((i) => <Tag key={i}>{i}</Tag>)}
              </div>
            </div>
            <div
              className={css`
                color: var(--adm-color-text-secondary);
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              `}
            >
              {video.chinese_title || video.title}
            </div>
          </div>
          {extra && <div style={{ marginLeft: '0.4rem' }}>{extra}</div>}
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
