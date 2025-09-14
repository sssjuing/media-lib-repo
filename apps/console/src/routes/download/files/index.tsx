import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Alert, Button, Card, Divider, Modal, Table } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import { GridContent } from '@repo/antd-layout';
import { Exception } from '@repo/ui';
import { request } from '@/services';
import { BatchCopyModal, ConvertModal, UploadModal } from './-components';

export const Route = createFileRoute('/download/files/')({
  staticData: { name: '下载文件', weight: 2 },
  loader: () => request<{ path: string; size: number }[]>({ method: 'GET', url: '/download/files' }),
  component: RouteComponent,
  errorComponent: () => <Exception type={500} title="请求错误" className="mt-20" />,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <GridContent>
      <Card>
        <div className="my-1">
          <Alert
            message={
              <div className="flex items-center">
                <div className="mr-auto">
                  已选择 &nbsp;
                  <a style={{ fontWeight: 600 }}>{selected.length}</a>
                  &nbsp; 个文件。&nbsp;&nbsp;
                  {selected.length > 0 && <a onClick={() => setSelected([])}>清空</a>}
                </div>
                <div>
                  <Button
                    type="link"
                    disabled={selected.length === 0}
                    onClick={() => NiceModal.show(BatchCopyModal, { paths: selected })}
                    className="p-0! h-5.5!"
                  >
                    批量复制
                  </Button>
                  <Divider type="vertical" />
                  <Button
                    type="link"
                    danger
                    disabled={selected.length === 0}
                    onClick={() =>
                      Modal.confirm({
                        title: '确认删除以下文件吗？',
                        content: (
                          <ul>
                            {selected.map((path) => (
                              <li key={path}>{path}</li>
                            ))}
                          </ul>
                        ),
                        okText: '删除',
                        okButtonProps: { danger: true },
                        maskClosable: true,
                      })
                    }
                    className="p-0! h-5.5!"
                  >
                    批量删除
                  </Button>
                </div>
              </div>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          rowKey="path"
          columns={[
            { title: '路径', dataIndex: 'path' },
            { title: '大小', dataIndex: 'size', render: (val) => (val / 1024 / 1024).toFixed(2) + ' MB' },
            {
              title: '操作',
              render: (_, record) => {
                const { path } = record;
                const ext = path.slice(path.lastIndexOf('.'));
                return ext === '.ts' ? (
                  <a onClick={() => NiceModal.show(ConvertModal, { path })}>转换</a>
                ) : (
                  <a onClick={() => NiceModal.show(UploadModal, { path })}>上传</a>
                );
              },
            },
          ]}
          dataSource={data}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selected,
            onChange: (keys) => setSelected(keys as string[]),
          }}
          pagination={{ showSizeChanger: true, showTotal: (total) => `共 ${total} 条` }}
        />
      </Card>
    </GridContent>
  );
}
