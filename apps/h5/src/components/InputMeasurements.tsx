import { FC } from 'react';
import { css } from '@emotion/css';
import { Space } from 'antd-mobile';
import { Measurements } from '@repo/service';
import InputNumber from './InputNumber';

interface InputMeasurementsProps {
  value?: Measurements;
  onChange?: (val: Measurements) => void;
}

const InputMeasurements: FC<InputMeasurementsProps> = ({ value, onChange }) => {
  return (
    <div
      className={css`
        > div > div {
          color: #666;
        }
      `}
    >
      <Space>
        <div>胸围</div>
        <InputNumber value={value?.bust} onChange={(val) => onChange?.({ ...value!, bust: val })} />
      </Space>
      <Space>
        <div>腰围</div>
        <InputNumber
          value={value?.waist}
          onChange={(val) => onChange?.({ ...value!, waist: val })}
        />
      </Space>
      <Space>
        <div>臀围</div>
        <InputNumber value={value?.hips} onChange={(val) => onChange?.({ ...value!, hips: val })} />
      </Space>
    </div>
  );
};

export default InputMeasurements;
