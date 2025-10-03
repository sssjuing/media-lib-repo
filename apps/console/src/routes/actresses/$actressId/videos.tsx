import { Link, createFileRoute } from '@tanstack/react-router';
import { Button, Descriptions, List, Tag } from 'antd';
import dayjs from 'dayjs';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { Actress, getAge } from '@repo/service';
import { VideoCard } from '@/components/video-card';
import { services } from '@/services';

function getCupColor(cup: string) {
  if (cup >= 'I') {
    return '#ff3141';
  }
  if (cup >= 'G') {
    return '#f759ab';
  }
  if (cup >= 'E') {
    return '#ff8f1f';
  }
  if (cup >= 'C') {
    return '#40a9ff';
  }
  return '#00b578';
}

const measurementsRenderer = (actress: Actress) => {
  if (!actress.measurements) {
    return null;
  }
  const {
    cup,
    measurements: { bust, waist, hips },
  } = actress;
  return (
    <>
      B{bust}&nbsp;
      {cup && <Tag color={getCupColor(cup)}>{cup}</Tag>}/ W{waist} / H{hips}
    </>
  );
};

export const Route = createFileRoute('/actresses/$actressId/videos')({
  staticData: { name: '演员的相关视频' },
  loader: ({ params: { actressId } }) =>
    Promise.all([
      //
      services.actress.getById(Number(actressId)),
      services.actress.listVideos(Number(actressId)),
    ]),
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const [actress, videos] = Route.useLoaderData();

  return (
    <PageHeaderWrapper
      title={
        <>
          演员<i style={{ margin: '0 8px' }}>{actress?.unique_name}</i>的视频列表
        </>
      }
      breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}
      content={
        actress && (
          <Descriptions
            size="small"
            column={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
            items={[
              { label: '中文名', children: actress.chinese_name },
              { label: '年龄', children: getAge(actress.birth_date) },
              { label: '出道日期', children: actress.debut_date && dayjs(actress.debut_date).format('YYYY年MM月') },
              { label: '身高', children: actress.height && actress.height + ' CM' },
              { label: '三围', children: measurementsRenderer(actress) },
            ]}
            className="mt-2"
          />
        )
      }
      extra={
        <Button type="primary">
          <Link to="/actresses/$actressId/edit" params={{ actressId: actress.id.toString() }}>
            编辑演员
          </Link>
        </Button>
      }
    >
      <List
        rowKey="id"
        dataSource={videos}
        grid={{ gutter: 12, xxl: 4, xl: 3, lg: 2, md: 2, sm: 2, xs: 2 }}
        pagination={{ pageSize: 12 }}
        renderItem={(i) => (
          <List.Item>
            <VideoCard video={i} />
          </List.Item>
        )}
      />
    </PageHeaderWrapper>
  );
}
