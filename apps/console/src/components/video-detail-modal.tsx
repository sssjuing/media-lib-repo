import { Fragment } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Badge, Button, Empty, Modal, Popconfirm, Tag, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
import { Calendar, Tags, Users } from 'lucide-react';
import { Video, getAge } from '@repo/service';
import { request } from '@/services';
import { getAgeColor } from '@/utils/utils';

export interface VideoDetailModalProps {
  video?: Video;
}

export const VideoDetailModal = NiceModal.create(({ video }: VideoDetailModalProps) => {
  const modal = useModal();

  const mutation = useMutation({
    mutationFn: () =>
      request({ method: 'POST', url: '/download', data: { name: video?.serial_number, url: video?.m3u8_url } }),
    onSuccess: () => {
      message.success('添加成功');
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <Modal open={modal.visible} width={900} onCancel={modal.hide} afterClose={() => modal.remove()} footer={null}>
      {video ? (
        <div className="flex flex-col md:flex-row">
          {/* 封面 - 16:9 比例 */}
          <div className="relative w-full md:w-100 flex-shrink-0">
            <div className="w-full overflow-hidden">
              <img
                src={video.cover_url}
                alt={`${video.serial_number} 封面`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            {/* 编号标识 */}
            <div className="absolute top-3 left-3">
              <Tag className="bg-neutral-50/75!">{video.serial_number}</Tag>
            </div>
            {!video.video_url && video.m3u8_url && (
              <div className="mt-4">
                <Popconfirm
                  title="添加下载任务"
                  description={`确认添加下载 ${video.serial_number} 的 ts 文件到下载任务队列吗？`}
                  onConfirm={() => mutation.mutateAsync()}
                >
                  <Button icon={<DownloadOutlined />} type="text" />
                </Popconfirm>
              </div>
            )}
          </div>
          {/* 电影信息 */}
          <div className="flex-1 p-6 space-y-4">
            {/* 标题区域 */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold leading-tight text-balance">{video.title}</h2>
              {video.chinese_title && <h3 className="text-lg text-neutral-600 font-medium">{video.chinese_title}</h3>}
            </div>

            {/* 主演信息 */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-neutral-600 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-neutral-600">主演</p>
                <div className="flex flex-wrap gap-2">
                  {video.actresses?.map((a) => {
                    const age = video.release_date && getAge(a.birth_date, video.release_date);
                    return (
                      <Fragment key={a.id}>
                        <div className="px-2 py-1 border border-neutral-300 rounded-md font-medium">
                          {a.unique_name}
                          {age && <Badge count={age} showZero color={getAgeColor(age)} className="ml-1! -mt-0.5!" />}
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-start gap-3">
              <Tags className="w-5 h-5 text-neutral-600 mt-1 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-neutral-600">标签</p>
                <div className="flex flex-wrap min-h-5">
                  {!video.mosaic && <Tag color="orange">无码</Tag>}
                  {video.tags?.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </div>

            {/* 发行日期 */}
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-neutral-600" />
              <div>
                <p className="text-sm font-medium text-neutral-600">发行日期</p>
                <p className="text-base font-semibold">
                  {video.release_date && dayjs(video.release_date).format('YYYY年M月DD日')}
                </p>
              </div>
            </div>

            {/* 概要 */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-600">概要</p>
              <p className="text-base leading-relaxed text-pretty">{video.synopsis}</p>
            </div>
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </Modal>
  );
});
