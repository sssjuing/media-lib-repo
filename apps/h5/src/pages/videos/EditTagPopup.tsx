import { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Popup, Selector, Toast } from 'antd-mobile';
import { Video } from '@repo/service';
import { services } from '@/services';

export interface EditTagPopupProps {
  video?: Video;
  tags?: string[];
  onSuccess?: (video: Video) => void;
  onCancel?: () => void;
}

export const EditTagPopup: FC<EditTagPopupProps> = ({ video, tags = [], onSuccess, onCancel }) => {
  const [selected, setSelected] = useState<string[]>(video?.tags ?? []);

  const mutation = useMutation({
    mutationFn: () => services.video.update(Number(video!.id), { actresses: video!.actresses, tags: selected }),
    onSuccess: (v) => {
      onSuccess?.(v);
      Toast.show({
        icon: 'success',
        content: '更新成功',
      });
    },
    onError: (e) => {
      console.error(e);
      Toast.show({
        icon: 'fail',
        content: '更新失败',
      });
    },
  });

  useEffect(() => {
    setSelected(video?.tags ?? []);
  }, [video]);

  return (
    <Popup visible={!!video} onMaskClick={onCancel}>
      <div className="flex items-center justify-between p-1 border-b-1 border-neutral-800">
        <a onClick={onCancel} className="p-2 text-[15px]">
          取消
        </a>
        <a onClick={() => mutation.mutate()} className="p-2 text-[15px]">
          确定
        </a>
      </div>
      <div className="p-2 min-h-20 max-h-100 overflow-y-auto">
        <Selector
          columns={4}
          options={tags.map((tag) => ({ label: tag, value: tag }))}
          value={selected}
          multiple
          onChange={(arr) => setSelected(arr)}
        />
      </div>
    </Popup>
  );
};
