import { useMutation } from '@tanstack/react-query';
import { Button, Input, Modal, Steps, message } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import axios, { AxiosError } from 'axios';
import { useSetState } from 'react-use';
import { z } from 'zod';

const BASE_URL = 'https://website-parser-zeta.vercel.app/api/parse';
const urlSchema = z.url({ message: '请输入合法的 URL' });

type Response = {
  url: string;
  result: {
    synopsis: string;
    release_date: string;
    serial_number: string;
    title: string;
    actress_names: string[];
    cover_url: string;
    m3u8_url: string;
  };
};

export interface FetchVideoInfoModalProps {
  onSubmit: (vals: Response['result']) => void;
}

export const FetchVideoInfoModal = NiceModal.create(({ onSubmit }: FetchVideoInfoModalProps) => {
  const modal = useModal();
  const [state, setState] = useSetState<{ step: number; url?: string; info?: Response['result'] }>({ step: 1 });

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post<Response>(BASE_URL, { url: state.url });
      return data;
    },
    onSuccess: (data) => {
      setState({ info: data.result, step: 2 });
    },
    onError: (err: AxiosError<{ detail: { msg: string }[] }>) => {
      console.error(err);
      message.error('解析失败: ' + err.response?.data.detail[0].msg || '');
    },
  });

  const renderFooter = () => {
    const CancelButton = () => <Button onClick={() => modal.hide()}>取消</Button>;
    if (state.step === 1) {
      return (
        <div className="space-x-2">
          <CancelButton />
          <Button
            type="primary"
            onClick={() => {
              const result = urlSchema.safeParse(state.url);
              if (!result.success) {
                message.error(result.error.issues[0].message);
                return;
              }
              mutation.mutate();
            }}
            loading={mutation.isPending}
          >
            下一步
          </Button>
        </div>
      );
    }
    return (
      <div className="flex justify-between">
        <Button onClick={() => setState({ step: 1 })}>上一步</Button>
        <div className="space-x-2">
          <CancelButton />
          <Button
            type="primary"
            onClick={() => {
              onSubmit?.(state.info!);
              modal.hide();
            }}
          >
            提交
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Modal
      title="从网站中提取视频信息"
      open={modal.visible}
      width={650}
      onCancel={modal.hide}
      afterClose={() => modal.remove()}
      okText={state.step === 1 ? '下一步' : '提交'}
      footer={renderFooter()}
    >
      <div>
        <div className="flex justify-around">
          <Steps
            current={state.step - 1}
            items={[{ title: '输入网址' }, { title: '视频详情' }]}
            className="my-4! w-100!"
          />
        </div>
        <div>
          {state.step === 1 ? (
            <div className="text-center mt-3 mb-6">
              <Input
                placeholder="请输入网址"
                value={state.url}
                onChange={(e) => setState({ url: e.target.value })}
                className="w-100!"
              />
            </div>
          ) : (
            state.info && (
              <dl className="space-y-3">
                {Object.entries(state.info).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex flex-col gap-1 sm:flex-row sm:gap-4 py-2 border-b border-b-neutral-300 last:border-b-0"
                  >
                    <dt className="font-medium text-neutral-600 min-w-[120px]">{key}</dt>
                    <dd className="text-neutral-900 break-words flex-1">
                      {key === 'cover_url' ? (
                        <div className="flex space-x-2">
                          <img src={val as string} className="w-30" />
                          <a download href={val as string} target="_blank" rel="noreferrer">
                            下载
                          </a>
                        </div>
                      ) : (
                        val
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )
          )}
        </div>
      </div>
    </Modal>
  );
});
