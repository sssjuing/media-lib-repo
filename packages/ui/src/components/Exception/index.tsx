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
    <div className={cx('flex min-h-[500px] items-center', className)} style={style}>
      <div className="flex-[0_0_55%] pr-[120px] flex justify-end">
        <div
          className="w-full max-w-[430px] h-[360px] bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${image || typeConfig[pageType].img})` }}
        />
      </div>
      <div>
        <h1 className="mb-6 text-[#434e59] font-semibold text-7xl leading-18">{title || typeConfig[pageType].title}</h1>
        <div className="mb-4 text-gray-500 text-[20px] leading-7">{desc || typeConfig[pageType].desc}</div>
        <div
          className={css`
            button:not(:last-child) {
              margin-right: 8px;
            }
          `}
        >
          {actions}
        </div>
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
