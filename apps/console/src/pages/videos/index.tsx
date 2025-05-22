import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button, Input, List, Space } from 'antd';
import useSWR from 'swr';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import VideoCard from '@/components/VideoCard';
import { useUrlParams } from '@/hooks';
import { services } from '@/services';

export default function VideosIndexPage() {
  const navigate = useNavigate();
  const { data } = useSWR('/videos', services.video.list);

  const { value: urlParamsStrObj, setValue: setUrlParams } = useUrlParams({ searchStr: '', pageSize: 24, page: 1 });
  const urlParams = useMemo(
    () => ({
      ...urlParamsStrObj,
      pageSize: Number(urlParamsStrObj.pageSize),
      page: Number(urlParamsStrObj.page),
    }),
    [urlParamsStrObj],
  );

  const list = useMemo(() => {
    return data?.filter(({ title, chinese_title, serial_number }) =>
      `${title}${chinese_title}${serial_number}`.includes(urlParams.searchStr),
    );
  }, [data, urlParams.searchStr]);

  return (
    <PageHeaderWrapper
      title="视频列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}
      extra={
        <Space>
          <Input.Search
            defaultValue={urlParams.searchStr}
            onSearch={(val) => setUrlParams({ searchStr: val })}
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
          pageSize: urlParams.pageSize,
          current: urlParams.page,
          onChange: (page, pageSize) => {
            console.log(page, pageSize);
            setUrlParams({ page, pageSize });
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
