import { FC, useEffect } from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Select, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SubmitVideoDTO, Video } from '@repo/service';
import ImageUpload from '@/components/ImageUpload';
import { services } from '@/services';
import { useGlobalStore } from '@/store';
import { getSubstringAfter } from '@/utils/utils';

type FormStore = Overwrite<SubmitVideoDTO, { actresses?: number[] }>;

interface VideoFormProps {
  video?: Video;
  onSubmit?: (values: SubmitVideoDTO) => void;
  submitting?: boolean;
  onBack?: () => void;
}

const VideoForm: FC<VideoFormProps> = ({ video, onSubmit, submitting, onBack }) => {
  const [form] = Form.useForm();
  const videoTags = useGlobalStore((state) => state.videoTags);

  const { data: actressOptions = [] } = useQuery({
    queryKey: ['/actress-options'],
    queryFn: async () => {
      const actressList = await services.actress.list();
      return actressList?.map(({ id, unique_name, chinese_name }) => ({
        value: id,
        label: `${unique_name}[${chinese_name}]`,
      }));
    },
  });

  useEffect(() => {
    if (video) {
      form.setFieldsValue({
        ...video,
        actresses: video.actresses?.map((i) => i.id),
        cover_path: video.cover_url,
        video_path: video.video_url,
      });
    }
    return () => {
      form.resetFields();
    };
  }, [form, video]);

  const handleFinish = (values: FormStore) => {
    onSubmit?.({
      ...values,
      actresses: values.actresses?.map((i) => ({ id: i })),
      cover_path: getSubstringAfter(values.cover_path, 'media-lib/'),
      video_path: values.video_path && getSubstringAfter(values.video_path, 'media-lib/'),
      // video_path: values.bucket_path?.replace(/^https?:\/\/.*?\//, '/'),
    });
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={handleFinish}
      initialValues={{ Mosaic: true }}
    >
      <Form.Item label="Serial Number" required>
        <Space size="large">
          <Form.Item noStyle name="serial_number" rules={[{ required: true }]}>
            <Input style={{ width: '240px' }} />
          </Form.Item>
          <Form.Item noStyle name="mosaic" valuePropName="checked">
            <Checkbox>Mosaic</Checkbox>
          </Form.Item>
        </Space>
      </Form.Item>
      <Form.Item label="封面" name="cover_path" rules={[{ required: true }]}>
        <ImageUpload />
      </Form.Item>
      <Form.Item label="标题" name="title">
        <Input />
      </Form.Item>
      <Form.Item label="中文标题" name="chinese_title">
        <Input />
      </Form.Item>
      <Form.Item label="演员" name="actresses">
        <Select
          options={actressOptions}
          mode="multiple"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
        />
      </Form.Item>
      <Form.Item label="发行日期" name="release_date" getValueProps={(value) => ({ value: value && dayjs(value) })}>
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="资源路径"
        name="video_path"
        // rules={[{ type: 'url' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Tags" name="tags">
        <Select
          mode="multiple"
          tokenSeparators={[',']}
          allowClear
          options={videoTags.map((t) => ({ label: t, value: t }))}
        />
      </Form.Item>
      <Form.Item label="概要" name="synopsis">
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
          <Button onClick={onBack}>返回</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default VideoForm;
