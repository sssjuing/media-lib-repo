import { FC } from 'react';
import { useNavigate } from 'react-router';
import { List, Tag } from 'antd-mobile';
import { MdOutlineFolder, MdOutlineVideoFile } from 'react-icons/md';
import { FileDTO } from './data';

/**
 * 类型守卫函数
 * @param fileDTO
 * @returns
 */
function isFile(fileDTO: FileDTO): fileDTO is {
  key: string;
  name: string;
  ftype: 'file';
  size: number;
  last_modified: string;
  url: string;
} {
  return fileDTO.ftype === 'file';
}

interface FileListProps {
  data: FileDTO[];
}

const FileList: FC<FileListProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <List>
      {data.map((i) => (
        <List.Item
          key={i.name}
          prefix={
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full text-2xl"
              style={{ backgroundColor: i.ftype === 'file' ? '#874d00' : '#003a8c' }}
            >
              {i.ftype === 'file' ? <MdOutlineVideoFile /> : <MdOutlineFolder />}
            </div>
          }
          onClick={() => {
            if (isFile(i)) {
              window.location.href = i.url;
            } else {
              navigate(`/files/${i.name}`);
            }
          }}
          description={i.name}
        >
          <div className="flex items-center justify-between">
            <div className="w-48 whitespace-nowrap overflow-hidden text-ellipsis">{i.name}</div>
            <div>
              {i.ftype === 'file' && (
                <Tag round color="#185d7b">
                  {`${(i.size / 1024 / 1024).toFixed(2)}MB`}
                </Tag>
              )}
            </div>
          </div>
        </List.Item>
      ))}
    </List>
  );
};

export default FileList;
