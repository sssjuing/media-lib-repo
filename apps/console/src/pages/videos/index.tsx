import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button, Input, List, Space, Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import VideoCard from '@/components/VideoCard';
import { useUrlParams } from '@/hooks';
import { services } from '@/services';
import { useGlobalStore } from '@/store';

export default function VideosIndexPage() {
  const navigate = useNavigate();
  const videoTags = useGlobalStore((state) => state.videoTags);

  const { value: urlParamsStrObj, setValue: setUrlParams } = useUrlParams({
    searchStr: '',
    pageSize: 24,
    page: 1,
    tags: [] as string[],
  });
  const urlParams = useMemo(() => {
    const { pageSize, page, tags } = urlParamsStrObj;
    return {
      ...urlParamsStrObj,
      pageSize: pageSize ? Number(pageSize) : undefined,
      page: page ? Number(page) : undefined,
      tags: Array.isArray(tags) ? tags : tags ? [tags] : [],
    };
  }, [urlParamsStrObj]);

  const videosQuery = useQuery({
    queryKey: ['/videos', urlParams.tags],
    queryFn: () => services.video.list({ tags: urlParams.tags }),
  });

  const list = useMemo(() => {
    return videosQuery.data?.filter(({ title, chinese_title, serial_number }) =>
      `${title}${chinese_title}${serial_number}`.includes(urlParams.searchStr || ''),
    );
  }, [urlParams.searchStr, videosQuery.data]);

  return (
    <PageHeaderWrapper
      title="视频列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}
      content={
        <div className="flex items-center">
          <span className="mr-2">Tags:</span>
          {videoTags.map<React.ReactNode>((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={!!urlParams.tags.includes(tag)}
              onChange={(checked) => {
                const nextTags = checked ? [...urlParams.tags, tag] : urlParams.tags.filter((i) => i !== tag);
                setUrlParams({ tags: nextTags });
              }}
              className="mr-1!"
            >
              {tag}
            </Tag.CheckableTag>
          ))}
        </div>
      }
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
          defaultPageSize: 24,
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
