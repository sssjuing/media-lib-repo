import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Card, Grid, Tag } from 'antd-mobile';
import { SearchOutline } from 'antd-mobile-icons';
import { MdOndemandVideo } from 'react-icons/md';
import { Actress, Measurements, getAge, getAgeColor } from '@repo/service';

const ActressCard: FC<{ actress: Actress }> = ({ actress }) => {
  const navigate = useNavigate();
  const age = getAge(actress.birth_date);

  const renderMeasurements = ({ bust, waist, hips }: Measurements) =>
    `B${bust || '--'}/W${waist || '--'}/H${hips || '--'}`;

  return (
    <Card
      key={actress.id}
      className={css`
        margin-bottom: 1rem;
      `}
      title={
        <div
          className={css`
            display: flex;
            max-width: 18rem;
            align-items: center;
            > span {
              min-width: 0;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            a {
              margin-left: 0.3rem;
              font-size: 1.2rem;
            }
          `}
        >
          <span>
            {actress.unique_name} ( {actress.chinese_name} )
          </span>
          <a
            onClick={(e) => {
              e.stopPropagation();
              open(
                `https://thisav.com/cn/search/${actress.unique_name}`,
                '_blank',
                'noopener=yes,noreferrer=yes',
              );
            }}
          >
            <SearchOutline />
          </a>
        </div>
      }
      extra={<MdOndemandVideo style={{ fontSize: '1.2rem' }} />}
      onHeaderClick={() => navigate(`/actresses/${actress.id}/videos`)}
      onBodyClick={() => navigate(`/actresses/${actress.id}/edit`)}
    >
      <Grid
        columns={3}
        gap={8}
        className={css`
          .label {
            color: #878787;
            margin-right: 0.5rem;
            ::after {
              content: ':';
              margin-left: 0.2rem;
            }
          }
        `}
      >
        <Grid.Item>
          <span className="label">年龄</span>
          {age !== undefined && (
            <Tag color={getAgeColor(age)} fill="outline">
              {age}
            </Tag>
          )}
        </Grid.Item>
        <Grid.Item>
          <span className="label">身高</span>
          {actress.height}
        </Grid.Item>
        <Grid.Item>
          <span className="label">体重</span>
          {actress.weight}
        </Grid.Item>
        <Grid.Item>
          <span className="label">罩杯</span>
          {actress.cup}
        </Grid.Item>
        <Grid.Item span={2}>
          <span className="label">三围</span>
          {actress.measurements && renderMeasurements(actress.measurements)}
        </Grid.Item>
      </Grid>
      <div
        className={css`
          display: flex;
          margin-top: 0.5rem;
        `}
      >
        <div
          className={css`
            flex: 0 0 4rem;
            color: #878787;
            margin-right: 0.2rem;
          `}
        >
          其他名字 :
        </div>
        <div
          className={css`
            color: #666;
          `}
        >
          {actress.names?.join('、')}
        </div>
      </div>
    </Card>
  );
};

export default ActressCard;
