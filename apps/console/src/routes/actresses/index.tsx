import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { Button, Card, Input, Popconfirm, Table, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { z } from 'zod';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { Actress, getAge } from '@repo/service';
import { AnchorBtn } from '@repo/ui';
import configs from '@/configs';
import { useRefresh } from '@/hooks';
import { services } from '@/services';

const { CUP_TYPE } = configs;

export const Route = createFileRoute('/actresses/')({
  staticData: { name: '演员', icon: <UserOutlined />, hideChildrenInMenu: true },
  validateSearch: z.object({
    page: z.number().default(1).catch(1),
    size: z.number().default(10).catch(10),
    searchStr: z.string().default('').catch(''),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, size, searchStr } = Route.useSearch();
  const navigate = Route.useNavigate();
  const refresh = useRefresh(Route.id);

  const query = useQuery({ queryKey: ['/actresses'], queryFn: services.actress.list });

  const deleteMutation = useMutation({
    mutationFn: services.actress.delete,
    onSuccess: () => {
      message.success('删除成功');
      refresh();
    },
  });

  const list = useMemo(() => {
    const search = searchStr;
    if (!search) {
      return query.data;
    }
    return query.data?.filter((i) => i.unique_name.includes(search) || i.chinese_name.includes(search));
  }, [query.data, searchStr]);

  return (
    <PageHeaderWrapper
      title="演员列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}
      extra={
        <div className="flex space-x-2">
          <Input.Search
            defaultValue={searchStr}
            onSearch={(val) => navigate({ search: { size, searchStr: val } })}
            allowClear
            placeholder="请输入演员姓名"
            style={{ width: 200, marginLeft: 'auto' }}
          />
          <Link to="/actresses/create">
            <Button type="primary">创建</Button>
          </Link>
        </div>
      }
    >
      <Card>
        <Table
          rowKey="id"
          columns={[
            {
              title: '姓名',
              dataIndex: 'unique_name',
              render: (value, r) => (
                <Link to="/actresses/$actressId/videos" params={{ actressId: r.id.toString() }}>
                  {value}
                </Link>
              ),
            },
            { title: '中文名', dataIndex: 'chinese_name' },
            { title: '年龄', dataIndex: 'birth_date', render: (b) => getAge(b) },
            { title: '三维', dataIndex: 'measurements', render: (m) => JSON.stringify(m) },
            {
              title: '罩杯',
              dataIndex: 'cup',
              filters: CUP_TYPE.map((i) => ({ text: i, value: i })),
              onFilter: (value, record) => record.cup === value,
            },
            { title: '血型', dataIndex: 'blood_group' },
            {
              title: '创建时间',
              dataIndex: 'created_at',
              render: (c) => dayjs(c).format('YYYY-MM-DD'),
              sorter: (a, b) => dayjs(a.created_at).diff(b.created_at),
              defaultSortOrder: 'descend',
            },
            {
              title: '操作',
              render: (a: Actress) => (
                <div className="space-x-2">
                  <Link to="/actresses/$actressId/edit" params={{ actressId: a.id.toString() }}>
                    编辑
                  </Link>
                  <Popconfirm
                    title={`确认删除演员 ${a.unique_name} 吗？`}
                    onConfirm={() => deleteMutation.mutateAsync(a.id)}
                    okButtonProps={{ danger: true }}
                  >
                    <AnchorBtn danger>删除</AnchorBtn>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
          dataSource={list}
          pagination={{
            pageSize: size,
            current: page,
            onChange: (page, pageSize) => navigate({ search: { page, size: pageSize, searchStr } }),
          }}
          loading={query.isLoading}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
