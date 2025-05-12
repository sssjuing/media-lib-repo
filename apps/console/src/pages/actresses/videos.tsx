import { Link, useNavigate, useParams } from 'react-router';
import { css } from '@emotion/css';
import { Button, List } from 'antd';
import useSWR from 'swr';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import VideoCard from '@/components/VideoCard';
import { services } from '@/services';

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
      extra={
        <Button type="primary">
          <Link to={`/actresses/${actress_id}/edit`}>编辑演员</Link>
        </Button>
      }
    >
      <List
        rowKey="id"
        className={css`
          padding: 24px;
        `}
        dataSource={data}
        grid={{ gutter: 12, xxl: 4, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 }}
        pagination={{ pageSize: 12 }}
        renderItem={(i) => (
          <List.Item>
            <VideoCard video={i} disableActressLink />
          </List.Item>
        )}
      />
    </PageHeaderWrapper>
  );
}
