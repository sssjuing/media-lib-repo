import { FC, memo } from 'react';
import { css, cx } from '@emotion/css';
import { useLayout } from './useLayout';

const HeaderLogo: FC = () => {
  const { theme, logo, title, collapsed, onLogoClick } = useLayout();

  return (
    <div
      onClick={onLogoClick}
      className={cx(
        'flex items-center h-[var(--ant-layout-header-height)] mr-7 text-white cursor-pointer',
        css`
          &.light {
            color: black;
          }
        `,
        { light: theme === 'light' },
      )}
    >
      {logo && <img src={logo} alt="logo" className="h-8" />}
      {title && (
        <h1
          className={cx(
            'ml-3 text-[18px] font-semibold ',
            css`
              font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
              &.hidden {
                visibility: hidden;
              }
            `,
            { hidden: collapsed },
          )}
        >
          {title}
        </h1>
      )}
    </div>
  );
};

export default memo(HeaderLogo);
