import { FC } from 'react';
import { SpinLoading } from 'antd-mobile';

interface LoadingProps {
  content: string;
}

const Loading: FC<LoadingProps> = ({ content }) => (
  <div className="flex flex-col items-center m-auto">
    <SpinLoading className="mb-8" style={{ '--size': '48px' }} />
    <div>{content}...</div>
  </div>
);

export default Loading;
