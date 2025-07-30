import { FC, Key, useState } from 'react';
import { Alert, Table } from 'antd';
import { TableProps } from 'antd/lib/table';

interface SelectTableProps<T = unknown> extends TableProps<T> {
  selectedRowKeys?: Key[];
  onSelectChange?: (selectedRowKeys: Key[]) => void;
}

export const SelectTable: FC<SelectTableProps> = (props) => {
  const { selectedRowKeys: enteredSelectedRowKeys, onSelectChange, ...restProps } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const handleSelectChange = (rowKeys: Key[]) => {
    setSelectedRowKeys(rowKeys);
    onSelectChange?.(rowKeys);
  };

  return (
    <div>
      <div className="my-4">
        {selectedRowKeys.length > 0 && (
          <Alert
            message={
              <>
                Already select &nbsp;
                <a style={{ fontWeight: 600 }}>{(enteredSelectedRowKeys || selectedRowKeys).length}</a>
                &nbsp; items.&nbsp;&nbsp;
                {(enteredSelectedRowKeys || selectedRowKeys).length > 0 && (
                  <a onClick={() => handleSelectChange([])}>Clear</a>
                )}
              </>
            }
            type="info"
            showIcon
          />
        )}
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: enteredSelectedRowKeys || selectedRowKeys,
          onChange: handleSelectChange,
        }}
        {...restProps}
      />
    </div>
  );
};
