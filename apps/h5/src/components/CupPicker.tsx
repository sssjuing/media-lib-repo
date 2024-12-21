import { forwardRef, ForwardRefRenderFunction } from 'react';
import { Picker } from 'antd-mobile';
import { PickerRef, PickerValue } from 'antd-mobile/es/components/picker';

const CUP_TYPE = ['AA', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

export type CupPickerRef = PickerRef;

interface CupPickerProps {
  value?: string;
  onConfirm?: (val?: PickerValue) => void;
}

const CupPicker: ForwardRefRenderFunction<CupPickerRef, CupPickerProps> = (
  { value, onConfirm },
  ref,
) => {
  const handleConfirm = (val: PickerValue[]) => {
    onConfirm?.(val[0] || undefined);
  };

  return (
    <Picker
      ref={ref}
      columns={[CUP_TYPE.map((i) => ({ value: i, label: i }))]}
      value={value ? [value] : []}
      onConfirm={handleConfirm}
    >
      {(val) => val[0]?.label || '请选择'}
    </Picker>
  );
};

export default forwardRef(CupPicker);
