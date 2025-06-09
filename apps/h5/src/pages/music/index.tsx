import { FC, useState } from 'react';
import { Form, Input, Selector } from 'antd-mobile';
import ReactPlayer from 'react-player';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const Music: FC = () => {
  const [src, setSrc] = useState<string>();
  const [rate, setRate] = useState(1);

  return (
    <PageHeaderWrapper title="音乐" backIcon={false}>
      <Form>
        <Form.Item label="音频URL">
          <Input value={src} onChange={setSrc} />
        </Form.Item>
      </Form>
      <div className="p-8 text-center text-3xl">
        <a href="https://youtube.iiilab.com/" target="_blank" rel="noreferrer">
          将视频解析成音频
        </a>
      </div>
      <div className="pt-8">
        <div className="mb-8">
          <h3>播放速度</h3>
          <Selector
            options={[
              { value: 1, label: '1.0' },
              { value: 1.5, label: '1.5' },
              { value: 2, label: '2.0' },
              //
            ]}
            value={[rate]}
            onChange={([v]) => setRate(v!)}
          />
        </div>
        <ReactPlayer
          url={src}
          controls
          playbackRate={rate}
          config={{ file: { forceAudio: true } }}
          width="100%"
          height="3rem"
        />
      </div>
    </PageHeaderWrapper>
  );
};

export default Music;
