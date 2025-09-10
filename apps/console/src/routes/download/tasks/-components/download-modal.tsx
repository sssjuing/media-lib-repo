import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cx } from '@emotion/css';
import { Button, Modal, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { AlertCircle, BarChart3, Download } from 'lucide-react';
import { request } from '@/services';

interface DownloadModalProps {
  resourceId: string;
}

export const DownloadModal = NiceModal.create(({ resourceId }: DownloadModalProps) => {
  const modal = useModal();
  const query = useQuery({
    queryKey: ['resources', resourceId, 'segments'],
    queryFn: () => request<SegmentDTO[]>({ method: 'GET', url: `/resources/${resourceId}/segments` }),
    refetchInterval: 1000,
  });

  const mutation = useMutation({
    mutationFn: () => request({ method: 'POST', url: `/resources/${resourceId}/download` }),
    onSuccess: () => {
      message.success('已重新加入到下载队列');
    },
  });

  const stats = useMemo(() => {
    if (!query.data) {
      return;
    }
    const total = query.data.length;
    let downloads = 0;
    let failed = 0;
    for (let i = 0; i < total; i++) {
      if (query.data[i].s === 1) {
        downloads++;
      } else if (query.data[i].s === -1) {
        failed++;
      }
    }
    return { total, downloads, failed, progress: ((downloads / total) * 100).toFixed(2) + '%' };
  }, [query.data]);

  return (
    <Modal
      title="下载状态"
      width={800}
      open={modal.visible}
      onCancel={modal.hide}
      footer={null}
      afterClose={() => modal.remove()}
    >
      {stats && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 总数 */}
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="p-2 rounded-full bg-blue-100">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">总数</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
            </div>

            {/* 下载数 */}
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="p-2 rounded-full bg-green-100">
                <Download className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-green-700">下载数</p>
                <p className="text-2xl font-bold text-green-900">{stats.downloads}</p>
              </div>
            </div>

            {/* 失败数 */}
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-red-50 border border-red-200">
              <div className="p-2 rounded-full bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-700">失败数</p>
                <p className="text-2xl font-bold text-red-900">{stats.failed}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="p-2 rounded-full bg-blue-100">
                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700">进度</p>
                <p className="text-2xl font-bold text-blue-900">{stats.progress}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {query.data && (
        <div className="mt-4 flex items-center justify-center p-4 rounded-lg bg-slate-50 border border-slate-300 shadow-lg">
          <div className="flex flex-wrap  gap-1">
            {query.data.map(({ s }, idx) => (
              <div
                key={idx}
                className={cx('w-2 h-2 bg-slate-400', { 'bg-green-400!': s == 1, 'bg-red-500!': s == -1 })}
              />
            ))}
          </div>
        </div>
      )}
      <div className="mt-4 flex flex-row-reverse">
        <Button type="primary" icon={<ReloadOutlined />} onClick={() => mutation.mutate()}>
          重试
        </Button>
      </div>
    </Modal>
  );
});
