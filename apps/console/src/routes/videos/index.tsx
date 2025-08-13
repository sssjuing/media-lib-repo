import { Link, createFileRoute } from '@tanstack/react-router';
import { Button, Input, List, Tag } from 'antd';
import { DeleteOutlined, VideoCameraOutlined } from '@ant-design/icons';
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
  loaderDeps: ({ search }) => search,
  loader: ({ deps: { searchStr, ...restDeps } }) => services.video.paginate({ ...restDeps, search: searchStr }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, size, searchStr, tags } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, total } = Route.useLoaderData();
  const videoTags = useGlobalStore((state) => state.videoTags);

  return (
    <PageHeaderWrapper
      title="视频列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}
      content={
        <div className="flex">
          <div className="grow-0 shrink-0 w-10 mt-1">Tags :</div>
          <div className="flex-grow flex-wrap">
            {videoTags.map<React.ReactNode>((tag) => (
              <Tag.CheckableTag
                key={tag}
                checked={!!tags.includes(tag)}
                onChange={(checked) => {
                  const nextTags = checked ? [...tags, tag] : tags.filter((i) => i !== tag);
                  navigate({ search: { size, searchStr, tags: nextTags } });
                }}
                className="mr-1! mt-1!"
              >
                {tag}
              </Tag.CheckableTag>
            ))}
            <Button
              size="small"
              icon={<DeleteOutlined />}
              type="text"
              onClick={() => navigate({ search: { size, searchStr, tags: [] } })}
              className="text-zinc-400!"
            />
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
        dataSource={data}
        grid={{ gutter: 12, xxl: 6, xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }}
        pagination={{
          pageSizeOptions: [12, 24, 48, 72, 96],
          pageSize: size,
          current: page,
          total,
          onChange: (page, pageSize) => navigate({ search: { page, size: pageSize, searchStr, tags } }),
        }}
        renderItem={(i) => <List.Item>{<VideoCard video={i} />}</List.Item>}
      />
    </PageHeaderWrapper>
  );
}
