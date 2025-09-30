import { FC, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, DatePicker, Divider, Form, Input, Modal, Select, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
import { Actress, SubmitVideoDTO, Video } from '@repo/service';
import { ImageUpload } from '@/components/image-upload';
import { services } from '@/services';
import { useGlobalStore } from '@/store';
import { getSubstringAfter } from '@/utils/utils';
import { FetchVideoInfoModal, FetchVideoInfoModalProps } from './-fetch-video-info-modal';

type FormStore = Overwrite<SubmitVideoDTO, { actresses?: number[] }>;

interface VideoFormProps {
  video?: Video;
  onChange?: (values: FormStore) => void;
  onSubmit?: (values: SubmitVideoDTO) => void;
  submitting?: boolean;
  onBack?: () => void;
}

export const VideoForm: FC<VideoFormProps> = ({ video, onChange, onSubmit, submitting, onBack }) => {
  const [form] = Form.useForm();
  const videoTags = useGlobalStore((state) => state.videoTags);

  const { data: actresses = [] } = useQuery({
    queryKey: ['/actresses'],
    queryFn: services.actress.list,
  });

  const actressOptions = useMemo(
    () =>
      actresses.map(({ id, unique_name, chinese_name }) => ({ value: id, label: `${unique_name}[${chinese_name}]` })),
    [actresses],
  );

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

  const handleFetchVideoInfoSubmit: FetchVideoInfoModalProps['onSubmit'] = (vals) => {
    const actressIds = vals.actress_names.reduce((prev, curr) => {
      const target = actresses.find((a) => curr.indexOf(a.unique_name) > -1);
      if (target) {
        prev.push(target.id);
      }
      return prev;
    }, [] as number[]);
    form.setFieldsValue({ ...vals, actresses: actressIds });
  };

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
      onValuesChange={(_, values) => onChange?.(values)}
      onFinish={handleFinish}
      initialValues={{ Mosaic: true }}
      style={{ maxWidth: 1600 }}
    >
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Button onClick={() => NiceModal.show(FetchVideoInfoModal, { onSubmit: handleFetchVideoInfoSubmit })}>
          从网站抓取信息
        </Button>
      </Form.Item>
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
          popupRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
              <Button icon={<PlusOutlined />} onClick={() => NiceModal.show(CreateActressFormModal)}>
                添加演员
              </Button>
            </>
          )}
        />
      </Form.Item>
      <Form.Item label="发行日期" name="release_date" getValueProps={(value) => ({ value: value && dayjs(value) })}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="资源路径">
        <div className="flex items-center">
          <Form.Item
            name="video_path"
            noStyle
            // rules={[{ type: 'url' }]}
          >
            <Input />
          </Form.Item>
          {video?.video_url && (
            <div className="w-10 text-right">
              <a href={video.video_url} target="_blank" rel="noreferrer">
                预览
              </a>
            </div>
          )}
        </div>
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

const CreateActressFormModal = NiceModal.create(() => {
  const modal = useModal();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: services.actress.create,
    onSuccess: (actress) => {
      message.success('添加演员成功');
      queryClient.setQueryData<Actress[]>(['/actresses'], (old) => (old ? [actress, ...old] : [actress]));
      modal.hide();
    },
  });

  return (
    <Modal
      title="添加演员"
      onOk={() => form.submit()}
      open={modal.visible}
      okButtonProps={{ loading: mutation.isPending }}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
    >
      <Form
        form={form}
        wrapperCol={{ span: 15 }}
        labelCol={{ span: 6 }}
        onFinish={mutation.mutate}
        className="pt-4!"
        requiredMark={false}
      >
        <Form.Item label="姓名" name="unique_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="中文名字" name="chinese_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="英文名字" name="english_name">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
});
