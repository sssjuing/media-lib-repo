import { FC } from 'react';
import { css } from '@emotion/css';
import { SpinLoading } from 'antd-mobile';

interface LoadingProps {
  content: string;
}

const Loading: FC<LoadingProps> = ({ content }) => (
  <div
    className={css`
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      > div:first-of-type {
        margin-bottom: 2rem;
      }
    `}
  >
    <SpinLoading style={{ '--size': '48px' }} />
    <div>{content}...</div>
  </div>
);

export default Loading;
