import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, List, Space } from 'antd';
import useSWR from 'swr';
import { useSetState } from 'ahooks';
import { Breadcrumb, PageHeaderWrapper } from '@repo/route-layout';
import VideoCard from '@/components/VideoCard';
import { services } from '@/services';

export default function () {
  const navigate = useNavigate();
  const { data } = useSWR('/videos', services.video.list);
  const [state, setState] = useSetState({ searchStr: '', pageSize: 24 });

  const list = useMemo(() => {
    return data?.filter(({ title, chinese_title, serial_number }) =>
      `${title}${chinese_title}${serial_number}`.includes(state.searchStr),
    );
  }, [data, state]);

  return (
    <PageHeaderWrapper
      title="视频列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}
      extra={
        <Space>
          <Input.Search
            onSearch={(val) => setState({ searchStr: val })}
            placeholder="请输入番号或名称搜索"
            style={{ width: 200 }}
          />
          <Link to="/videos/create">
            <Button type="primary">创建</Button>
          </Link>
        </Space>
      }
    >
      <List
        rowKey="id"
        dataSource={list}
        grid={{ gutter: 12, xxl: 6, xl: 4, lg: 3, md: 3, sm: 3, xs: 3 }}
        pagination={{
          pageSizeOptions: [12, 24, 48, 72, 96],
          pageSize: state.pageSize,
          onShowSizeChange: (_, pageSize) => {
            setState({ pageSize });
          },
        }}
        renderItem={(i) => (
          <List.Item>
            <VideoCard video={i} />
          </List.Item>
        )}
      />
    </PageHeaderWrapper>
  );
}
