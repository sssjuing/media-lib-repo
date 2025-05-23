import { Link, useNavigate, useParams } from 'react-router';
import { css } from '@emotion/css';
import { Button, Descriptions, List, Tag } from 'antd';
import dayjs from 'dayjs';
import useSWR from 'swr';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { Actress, getAge } from '@repo/service';
import VideoCard from '@/components/VideoCard';
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

export default function ActressVideosPage() {
  const navigate = useNavigate();
  const { actress_id } = useParams();
  const { data: actress } = useSWR(`/actresses/${actress_id}`, () => services.actress.getById(Number(actress_id)));
  const { data = [] } = useSWR(`/actresses/${actress_id}/videos`, () =>
    services.actress.listVideos(Number(actress_id)),
  );

  return (
    <PageHeaderWrapper
      title={
        <>
          演员<i style={{ margin: '0 8px' }}>{actress?.unique_name}</i>的视频列表
        </>
      }
      breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}
      content={
        actress && (
          <Descriptions
            size="small"
            column={{ xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
            items={[
              {
                label: '中文名',
                children: actress.chinese_name,
              },
              {
                label: '年龄',
                children: getAge(actress.birth_date),
              },
              {
                label: '出道日期',
                children: actress.debut_date && dayjs(actress.debut_date).format('YYYY年MM月'),
              },

              {
                label: '身高',
                children: actress.height && actress.height + ' CM',
              },
              {
                label: '三围',
                children: measurementsRenderer(actress),
              },
            ]}
            className={css`
              margin-top: 10px;
            `}
          />
        )
      }
      extra={
        <Button type="primary">
          <Link to={`/actresses/${actress_id}/edit`}>编辑演员</Link>
        </Button>
      }
    >
      <List
        rowKey="id"
        dataSource={data}
        grid={{ gutter: 12, xxl: 4, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
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
