import { Input, Modal, message } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import dayjs from 'dayjs';
import { useImmer } from 'use-immer';
import { sleep } from '@repo/service';
import { request } from '@/services';

export interface UploadModalProps {
  paths?: string[];
}

export const UploadModal = NiceModal.create(({ paths = [] }: UploadModalProps) => {
  const modal = useModal();
  const [state, setState] = useImmer({
    targetDir: `videos/avs/${dayjs().format('YYYYMM')}/`,
    status: new Array(paths.length).fill(0) as number[],
    pending: false,
  });

  const handleOk = async () => {
    setState((draft) => {
      draft.pending = true;
    });
    for (let i = 0; i < paths.length; i++) {
      const data = { target_dir: state.targetDir, file_path: paths[i] };
      try {
        await request({ method: 'POST', url: '/files/upload-local-file', data });
        setState((draft) => {
          draft.status[i] = 1;
        });
      } catch {
        setState((draft) => {
          draft.status[i] = -1;
        });
      }
    }
    setState((draft) => {
      draft.pending = false;
    });
    message.success('上传成功');
    await sleep(1000);
    modal.hide();
  };

  const renderStatus = (status: number) => {
    if (status === 1) {
      return (
        <span className="text-green-500">
          <CheckOutlined />
        </span>
      );
    }
    if (status === -1) {
      return (
        <span className="text-red-500">
          <CloseOutlined />
        </span>
      );
    }
    return '';
  };

  return (
    <Modal
      title="上传文件到 MinIO"
      open={modal.visible}
      onOk={handleOk}
      okButtonProps={{ loading: state.pending, disabled: paths?.length === 0 }}
      onCancel={() => !state.pending && modal.hide()}
      afterClose={() => modal.remove()}
    >
      <div>
        <div className="my-4 px-4 py-2 border-1 border-blue-400 bg-blue-100 rounded-md  hover:shadow-md shadow-blue-300 transition-shadow">
          <div className="font-medium mb-1">以下文件将被上传到 MinIO:</div>
          <ul className="space-y-1">
            {paths?.map((p, idx) => (
              <li key={p} className="px-2 text-neutral-500 flex justify-between hover:bg-blue-200">
                <span className="truncate">{p}</span>
                {renderStatus(state.status[idx])}
              </li>
            ))}
          </ul>
        </div>
        <p className="mb-1">选择要保存到的 MinIO 路径: </p>
        <Input
          addonBefore="/media-lib/"
          value={state.targetDir}
          onChange={(e) =>
            setState((draft) => {
              draft.targetDir = e.target.value;
            })
          }
          disabled={state.pending}
        />
        {/* <TreeSelect
          showSearch
          style={{ width: '100%' }}
          // value={value}
          styles={{
            popup: { root: { maxHeight: 400, overflow: 'auto' } },
          }}
          placeholder="Please select"
          allowClear
          treeDefaultExpandAll
          // onChange={onChange}
          treeData={treeData}
          // onPopupScroll={onPopupScroll}
        /> */}
      </div>
    </Modal>
  );
});

// const treeData = [
//   {
//     value: 'parent 1',
//     title: 'parent 1',
//     children: [
//       {
//         value: 'parent 1-0',
//         title: 'parent 1-0',
//         children: [
//           {
//             value: 'leaf1',
//             title: 'leaf1',
//           },
//           {
//             value: 'leaf2',
//             title: 'leaf2',
//           },
//           {
//             value: 'leaf3',
//             title: 'leaf3',
//           },
//           {
//             value: 'leaf4',
//             title: 'leaf4',
//           },
//           {
//             value: 'leaf5',
//             title: 'leaf5',
//           },
//           {
//             value: 'leaf6',
//             title: 'leaf6',
//           },
//         ],
//       },
//       {
//         value: 'parent 1-1',
//         title: 'parent 1-1',
//         children: [
//           {
//             value: 'leaf11',
//             title: <b style={{ color: '#08c' }}>leaf11</b>,
//           },
//         ],
//       },
//     ],
//   },
// ];
