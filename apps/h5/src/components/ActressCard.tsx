import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Card, Grid, Tag } from 'antd-mobile';
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
      className="mb-4"
      title={
        <div className="flex max-w-72 items-center">
          <span className="min-w-0 whitespace-nowrap overflow-hidden text-ellipsis">
            {actress.unique_name} ( {actress.chinese_name} )
          </span>
        </div>
      }
      extra={<MdOndemandVideo style={{ fontSize: '1.2rem' }} />}
      onHeaderClick={() => navigate(`/actresses/${actress.id}/videos`)}
      onBodyClick={() => navigate(`/actresses/${actress.id}/edit`)}
    >
      <Grid columns={3} gap={8}>
        <Grid.Item>
          <span className="text-neutral-400 mr-2">年龄 :</span>
          {age !== undefined && (
            <Tag color={getAgeColor(age)} fill="outline">
              {age}
            </Tag>
          )}
        </Grid.Item>
        <Grid.Item>
          <span className="text-neutral-400 mr-2">身高 :</span>
          {actress.height}
        </Grid.Item>
        <Grid.Item>
          <span className="text-neutral-400 mr-2">体重 :</span>
          {actress.weight}
        </Grid.Item>
        <Grid.Item>
          <span className="text-neutral-400 mr-2">罩杯 :</span>
          {actress.cup}
        </Grid.Item>
        <Grid.Item span={2}>
          <span className="text-neutral-400 mr-2">三围 :</span>
          {actress.measurements && renderMeasurements(actress.measurements)}
        </Grid.Item>
      </Grid>
      <div className="flex mt-2">
        <div className="grow-0 shrink-0 basis-16 text-neutral-400 mr-1">其他名字 :</div>
        <div className="text-neutral-500">{actress.other_names?.join('、')}</div>
      </div>
    </Card>
  );
};

export default ActressCard;
