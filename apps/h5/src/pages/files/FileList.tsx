import { FC } from 'react';
import { useNavigate } from 'react-router';
import { css } from '@emotion/css';
import { List, Tag } from 'antd-mobile';
import { MdOutlineFolder, MdOutlineOndemandVideo } from 'react-icons/md';
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
              className={css`
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2.5rem;
                height: 2.5rem;
                border-radius: 50%;
                font-size: 1.5rem;
                background-color: ${i.ftype === 'file' ? '#874d00' : '#003a8c'};
              `}
            >
              {i.ftype === 'file' ? <MdOutlineOndemandVideo /> : <MdOutlineFolder />}
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
          <div
            className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <div
              className={css`
                width: 12rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              `}
            >
              {i.name}
            </div>
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
