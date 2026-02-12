import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { cx } from '@emotion/css';
import { Button, Input, List, Tag } from 'antd';
import { DeleteOutlined, DownOutlined, UpOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { useSetState } from 'react-use';
import { z } from 'zod';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { VideoCard } from '@/components/video-card';
import { services } from '@/services';
import { useGlobalStore } from '@/store';

export const Route = createFileRoute('/videos/')({
  staticData: { name: '视频列表', weight: 2, icon: <VideoCameraOutlined />, hideChildrenInMenu: true },
  validateSearch: z.object({
    page: z.number().default(1).catch(1),
    size: z.number().default(24).catch(24),
    searchStr: z.string().default('').catch(''),
    tags: z.array(z.string()).default([]).catch([]),
  }),
  // loaderDeps: ({ search }) => search,
  // loader: ({ deps: { searchStr, ...restDeps } }) => services.video.paginate({ ...restDeps, search: searchStr }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, size, searchStr, tags } = Route.useSearch();
  const navigate = Route.useNavigate();
  const videoTags = useGlobalStore((state) => state.videoTags);
  const [state, setState] = useSetState({
    expanded: false,
  });

  const query = useQuery({
    queryKey: ['fetchVideos', page, size, tags, searchStr],
    queryFn: () => services.video.paginate({ page, size, tags, search: searchStr }),
  });

  return (
    <PageHeaderWrapper
      title="视频列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}
      content={
        <div className="flex">
          <div className="grow-0 shrink-0 w-10 mt-2">Tags :</div>
          <div
            className={cx(
              'flex-grow flex-wrap overflow-hidden transition-all duration-300 ease-in-out',
              state.expanded ? 'max-h-25' : 'max-h-8',
            )}
          >
            {videoTags.map<React.ReactNode>((tag) => (
              <Tag.CheckableTag
                key={tag}
                checked={!!tags.includes(tag)}
                onChange={(checked) => {
                  const nextTags = checked ? [...tags, tag] : tags.filter((i) => i !== tag);
                  navigate({ search: { size, searchStr, tags: nextTags } });
                }}
                className="mr-1! mt-2!"
              >
                {tag}
              </Tag.CheckableTag>
            ))}
          </div>
          <div className="mt-1.5 flex">
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="text"
              onClick={() => navigate({ search: { size, searchStr, tags: [] } })}
              className="text-zinc-400!"
              title="清除所有标签"
            />
            <Button
              type="link"
              size="small"
              icon={state.expanded ? <UpOutlined /> : <DownOutlined />}
              onClick={() => setState({ expanded: !state.expanded })}
              iconPosition="end"
              styles={{ icon: { marginLeft: -6 } }}
            >
              {state.expanded ? '收起' : '展开'}
            </Button>
          </div>
        </div>
      }
      extra={
        <div className="space-x-2">
          <Input.Search
            defaultValue={searchStr}
            onSearch={(val) => navigate({ search: { size, searchStr: val } })}
            allowClear
            placeholder="请输入番号或名称搜索"
            style={{ width: 200 }}
          />
          <Link to="/videos/create">
            <Button type="primary">创建</Button>
          </Link>
        </div>
      }
    >
      <List
        rowKey="id"
        dataSource={query.data?.data}
        grid={{ gutter: 12, xxl: 6, xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }}
        pagination={{
          pageSizeOptions: [12, 24, 48, 72, 96],
          pageSize: size,
          current: page,
          total: query.data?.total,
          onChange: (page, pageSize) => navigate({ search: { page, size: pageSize, searchStr, tags } }),
        }}
        renderItem={(i) => <List.Item>{<VideoCard video={i} />}</List.Item>}
        loading={query.isPending}
      />
    </PageHeaderWrapper>
  );
}
