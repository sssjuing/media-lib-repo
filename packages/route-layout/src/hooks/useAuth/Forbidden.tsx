import { FC, memo, ReactNode } from 'react';
import { css } from '@emotion/css';

export interface ForbiddenProps {
  actions?: ReactNode[];
}

const Forbidden: FC<ForbiddenProps> = ({ actions }) => {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        height: 80%;
        min-height: 500px;
        padding-top: 120px;
        > div:first-of-type {
          flex: 0 0 62.5%;
          width: 62.5%;
          padding-right: 152px;
        }
      `}
    >
      <div>
        <div
          className={css`
            float: right;
            width: 100%;
            max-width: 430px;
            height: 360px;
            background: no-repeat 50% 50%;
            background-size: contain;
            background-image: url(https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg);
          `}
        />
      </div>
      <div
        className={css`
          flex: auto;
          h1 {
            margin: 0;
            margin-bottom: 24px;
            color: #434e59;
            font-weight: 600;
            font-size: 72px;
            line-height: 72px;
          }
          > div:first-of-type {
            margin-bottom: 16px;
            color: var(--ant-color-text-secondary);
            font-size: 20px;
            line-height: 28px;
          }
          > div:first-of-type {
            button:not(:last-child) {
              margin-right: 8px;
            }
          }
        `}
      >
        <h1>403</h1>
        <div>抱歉，你无权访问此页面</div>
        <div>{actions?.map((a) => a)}</div>
      </div>
    </div>
  );
};

export default memo(Forbidden);
