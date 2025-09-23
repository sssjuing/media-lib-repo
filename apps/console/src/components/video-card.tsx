import { FC, Fragment } from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { Badge, Button, Empty, Image, Modal, Tag } from 'antd';
import { EditOutlined, VideoCameraTwoTone } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
import { Calendar, Tags, Users } from 'lucide-react';
import { Actress, Video, getAge } from '@repo/service';
import { AnchorBtn } from '@repo/ui';

function getAgeColor(age: number) {
  if (age >= 45) return '#ff3141';
  if (age >= 40) return 'red';
  if (age >= 35) return 'volcano';
  if (age >= 30) return 'gold';
  if (age >= 25) return 'blue';
  if (age >= 20) return 'green';
  if (age >= 18) return 'purple';
  return '';
}

interface ActressTagProps {
  actress: Actress;
  video: Video;
}

const ActressTag: FC<ActressTagProps> = ({ actress, video }) => {
  const { actressId } = useParams({ strict: false });

  const age = video.release_date && getAge(actress.birth_date, video.release_date);
  const text = !age ? actress.unique_name : `${actress.unique_name} ${age}`;

  if (Number(actressId) === actress.id) {
    return <Tag color={age ? getAgeColor(age) : undefined}>{text}</Tag>;
  }

  return (
    <Link to="/actresses/$actressId/videos" params={{ actressId: actress.id.toString() }}>
      <Tag color={age ? getAgeColor(age) : undefined}>{text}</Tag>
    </Link>
  );
};

const DetailModal = NiceModal.create(({ video }: { video?: Video }) => {
  const modal = useModal();

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

interface VideoCardProps {
  video: Video;
}

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const title = video.chinese_title || video.title;

  return (
    <div className="bg-white">
      <Image
        src={video.cover_url || 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
        className="object-contain aspect-[40/27]"
      />
      <div className="p-3">
        <div>
          <div className="flex items-center">
            <div className="flex-1">
              <AnchorBtn onClick={() => NiceModal.show(DetailModal, { video })}>{video.serial_number}</AnchorBtn>
            </div>
            <div>
              {video.video_url && (
                <Button type="text" size="small" onClick={() => open(video.video_url)}>
                  <VideoCameraTwoTone />
                </Button>
              )}
              <Button type="text" size="small">
                <Link to="/videos/$videoId/edit" params={{ videoId: video.id.toString() }}>
                  <EditOutlined style={{ color: '#999' }} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex mr-3 mb-1">
            <div className="mr-2 after:content-[':'] after:ml-0.5">片名{video.chinese_title && '(中)'}</div>
            <div className="flex-1 truncate" title={title}>
              {title}
            </div>
          </div>
          <div className="flex mr-3 mb-1">
            <div className="mr-2 after:content-[':'] after:ml-0.5">演员</div>
            <div className="">
              {video.actresses?.map((a) => (
                <ActressTag key={a.id} actress={a} video={video} />
              ))}
            </div>
          </div>
          <div className="flex mr-3">
            <div className="mr-2 after:content-[':'] after:ml-0.5">Tags</div>
            <div className="tags">
              {!video.mosaic && <Tag color="orange">无码</Tag>}
              {video.tags?.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
