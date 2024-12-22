import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Button, DatePicker, Form, Input, InputNumber, Radio, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { Actress, Measurements, SubmitActressDTO } from '@repo/service';
import configs from '@/configs';

const { CUP_TYPE } = configs;

const MeasurementsInput: FC<{
  value?: Measurements;
  onChange?: (val?: Measurements) => void;
}> = ({ value, onChange }) => {
  const defaultValue = { bust: 90, waist: 60, hips: 90 };

  return (
    <div
      className={css`
        .label {
          margin-left: 12px;
        }
      `}
    >
      <span className="label">胸围：</span>
      <InputNumber
        value={value?.bust}
        onChange={(val) => val && onChange?.({ ...defaultValue, ...value, bust: val })}
      />
      <span className="label">腰围：</span>
      <InputNumber
        value={value?.waist}
        onChange={(val) => val && onChange?.({ ...defaultValue, ...value, waist: val })}
      />
      <span className="label">臀围：</span>
      <InputNumber
        value={value?.hips}
        onChange={(val) => val && onChange?.({ ...defaultValue, ...value, hips: val })}
      />
    </div>
  );
};

interface ActressFormProps {
  actress?: Actress;
  onSubmit?: (values: SubmitActressDTO) => void;
}

const ActressForm: FC<ActressFormProps> = ({ actress, onSubmit }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (actress) {
      form.setFieldsValue(actress);
    }
    return () => {
      form.resetFields();
    };
  }, [form, actress]);

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
      onFinish={onSubmit}
      initialValues={{ Mosaic: true }}
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
      <Form.Item label="其他名字" name="other_names">
        <Select mode="tags" placeholder="逗号或顿号分隔不同名字" />
      </Form.Item>
      <Form.Item
        label="出生日期"
        name="birth_date"
        getValueProps={(value) => ({ value: value && dayjs(value) })}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="出生地" name="birth_place">
        <Input />
      </Form.Item>
      <Form.Item label="身高 (cm)" name="height">
        <InputNumber />
      </Form.Item>
      <Form.Item label="体重 (kg)" name="weight">
        <InputNumber />
      </Form.Item>
      <Form.Item label="三围 (cm)" name="measurements">
        <MeasurementsInput />
      </Form.Item>
      <Form.Item label="罩杯" name="cup">
        <Select options={CUP_TYPE.map((i) => ({ value: i }))} />
      </Form.Item>
      <Form.Item label="血型" name="blood_group">
        <Radio.Group options={['A', 'B', 'AB', 'O']} />
      </Form.Item>
      <Form.Item
        label="出道日期"
        name="debut_date"
        getValueProps={(value) => ({ value: value && dayjs(value) })}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="爱好" name="hobbies">
        <Input />
      </Form.Item>
      <Form.Item label="备注" name="notes">
        <Input.TextArea rows={5} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button onClick={() => navigate('/actresses')}>返回</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ActressForm;
