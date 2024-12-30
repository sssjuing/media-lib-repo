import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Input, Popconfirm, Space, Table } from 'antd';
import useSWR from 'swr';
import dayjs from 'dayjs';
import { AnchorBtn } from '@repo/ui';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { getAge, Actress } from '@repo/service';
import configs from '@/configs';
import { services } from '@/services';

const { CUP_TYPE } = configs;

export default function () {
  const navigate = useNavigate();

  const { data, mutate } = useSWR('/actresses', services.actress.list);

  const [searchStr, setSearchStr] = useState('');

  const list = useMemo(
    () =>
      data?.filter((i) => i.unique_name.includes(searchStr) || i.chinese_name.includes(searchStr)),
    [data, searchStr],
  );

  return (
    <PageHeaderWrapper
      title="演员列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}
      extra={
        <Space>
          <Input.Search
            onSearch={setSearchStr}
            placeholder="请输入演员姓名"
            style={{ width: 200, marginLeft: 'auto' }}
          />
          <Link to="/actresses/create">
            <Button type="primary">创建</Button>
          </Link>
        </Space>
      }
    >
      <Card>
        <Table
          rowKey="id"
          columns={[
            {
              title: '姓名',
              dataIndex: 'unique_name',
              render: (value, r) => <Link to={`/actresses/${r.id}/videos`}>{value}</Link>,
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
                  <Link to={`/actresses/${a.id}/edit`}>编辑</Link>
                  <Popconfirm
                    title={`确认删除演员 ${a.unique_name} 吗？`}
                    onConfirm={async () => {
                      await services.actress.delete(a.id);
                      mutate();
                    }}
                    okButtonProps={{ danger: true }}
                  >
                    <AnchorBtn danger>删除</AnchorBtn>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={list}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
