import React, { memo } from 'react';
import { css, cx } from '@emotion/css';
import typeConfig from './typeConfig';

export interface ExceptionProps {
  type: keyof typeof typeConfig;
  title?: string;
  desc?: string;
  image?: string;
  actions?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Exception: React.FC<ExceptionProps> = (props) => {
  const { type, title, desc, image, actions, className, style } = props;

  const pageType = type && type in typeConfig ? type : '404';

  return (
    <div
      className={cx(
        css`
          display: flex;
          align-items: center;
          min-height: 500px;
        `,
        className,
      )}
      style={style}
    >
      <div
        className={css`
          flex: 0 0 55%;
          width: 62.5%;
          padding-right: 120px;
        `}
      >
        <div
          className={css`
            float: right;
            width: 100%;
            max-width: 430px;
            height: 360px;
            background: no-repeat 50% 50%;
            background-size: contain;
            background-image: url(${image || typeConfig[pageType].img});
          `}
        />
      </div>
      <div
        className={css`
          flex: auto;
          > h1 {
            margin: 0;
            margin-bottom: 24px;
            color: #434e59;
            font-weight: 600;
            font-size: 72px;
            line-height: 72px;
          }
          > div.desc {
            margin-bottom: 16px;
            color: rgba(0, 0, 0, 0.65);
            font-size: 20px;
            line-height: 28px;
          }
          > div.actions {
            button:not(:last-child) {
              margin-right: 8px;
            }
          }
        `}
      >
        <h1>{title || typeConfig[pageType].title}</h1>
        <div className="desc">{desc || typeConfig[pageType].desc}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>
  );
};

const MemoException = memo(Exception);
export { MemoException as Exception };

// @media screen and (max-width: @screen-xl) {
//   .exception {
//     .imgBlock {
//       padding-right: 88px;
//     }
//   }
// }

// @media screen and (max-width: @screen-sm) {
//   .exception {
//     display: block;
//     text-align: center;
//     .imgBlock {
//       margin: 0 auto 24px;
//       padding-right: 0;
//     }
//   }
// }

// @media screen and (max-width: @screen-xs) {
//   .exception {
//     .imgBlock {
//       margin-bottom: -24px;
//       overflow: hidden;
//     }
//   }
// }
