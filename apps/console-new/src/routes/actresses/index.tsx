import { Button, Card, Input, Popconfirm, Space, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { Actress, getAge } from '@repo/service';
import { AnchorBtn } from '@repo/ui';
import configs from '@/configs';
import { services } from '@/services';

const { CUP_TYPE } = configs;

export const Route = createFileRoute('/actresses/')({
  staticData: { name: '演员', icon: <UserOutlined />, hideChildrenInMenu: true },
  component: RouteComponent,
  loader: () => services.actress.list(),
  errorComponent: ({ error }) => <div>❌ 加载失败：{error.message}</div>,
  pendingComponent: () => <div>⏳ 加载中...</div>,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const actresses = Route.useLoaderData();

  return (
    <PageHeaderWrapper
      title="演员列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate({ to: key })} />}
      extra={
        <Space>
          <Input.Search
            // onSearch={(val) => setUrlParams({ searchStr: val })}
            placeholder="请输入演员姓名"
            // defaultValue={urlParams.searchStr}
            style={{ width: 200, marginLeft: 'auto' }}
          />
          <Link to="/actresses/create">
            <Button type="primary">创建</Button>
          </Link>
        </Space>
      }
    >
      <Card variant="borderless">
        <Table
          rowKey="id"
          columns={[
            {
              title: '姓名',
              dataIndex: 'unique_name',
              // render: (value, r) => <Link to={`./${r.id}/videos`}>{value}</Link>,
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
                <Space>
                  {/* <Link to={`./${a.id}/edit`}>编辑</Link> */}
                  <Popconfirm
                    title={`确认删除演员 ${a.unique_name} 吗？`}
                    // onConfirm={() => deleteMutation.mutateAsync(a.id)}
                    okButtonProps={{ danger: true }}
                  >
                    <AnchorBtn danger>删除</AnchorBtn>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={actresses || []}
          // pagination={{
          //   pageSize: urlParams.pageSize,
          //   current: urlParams.page,
          //   onChange: (page, pageSize) => setUrlParams({ page, pageSize }),
          // }}
          // loading={query.isLoading}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
