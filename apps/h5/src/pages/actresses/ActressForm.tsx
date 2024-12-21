import { FC, RefObject, useEffect } from 'react';
import { Button, Form, Input, Radio, Space, TextArea } from 'antd-mobile';
import { Actress, SubmitActressDTO } from '@repo/service';
import InputMeasurements from '@/components/InputMeasurements';
import CupPicker, { CupPickerRef } from '@/components/CupPicker';

interface ActressFormProps {
  actress?: Actress;
  onSubmit?: (
    values: Pick<
      SubmitActressDTO,
      'unique_name' | 'chinese_name' | 'measurements' | 'cup' | 'blood_group' | 'notes'
    >,
  ) => void;
}

const ActressForm: FC<ActressFormProps> = ({ actress, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (actress) {
      form.setFieldsValue(actress);
    }
  }, [actress, form]);

  return (
    <Form form={form} onFinish={onSubmit}>
      <Form.Header>填写演员信息</Form.Header>
      <Form.Item label="姓名" name="unique_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="中文名字" name="chinese_name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="三围 (cm)" name="measurements">
        <InputMeasurements />
      </Form.Item>
      <Form.Item
        label="罩杯"
        name="cup"
        trigger="onConfirm"
        onClick={(e, datePickerRef: RefObject<CupPickerRef>) => {
          datePickerRef.current?.open();
        }}
      >
        <CupPicker />
      </Form.Item>
      <Form.Item label="血型" name="blood_group">
        <Radio.Group>
          <Space style={{ '--gap': '1.5rem' }}>
            {['A', 'B', 'AB', 'O'].map((i) => (
              <Radio key={i} value={i}>
                {i}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="备注" name="notes">
        <TextArea placeholder="请输入内容" rows={5} />
      </Form.Item>
      <Form.Item>
        <Button block type="submit" color="primary">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ActressForm;
