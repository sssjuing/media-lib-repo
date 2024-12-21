import { FC } from 'react';
import { Input } from 'antd-mobile';

interface InputNumberProps {
  value?: number;
  onChange?: (val: number) => void;
}

const InputNumber: FC<InputNumberProps> = ({ value, onChange }) => {
  const handleChange = (val: string) => {
    onChange?.(Number(val) || 0);
  };

  return <Input value={(value || '') as string | undefined} onChange={handleChange} type="number" />;
};

export default InputNumber;
