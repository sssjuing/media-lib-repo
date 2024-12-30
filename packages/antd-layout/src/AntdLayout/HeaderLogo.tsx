import { FC, memo } from 'react';
import { css, cx } from '@emotion/css';
import { useLayout } from './useLayout';

const HeaderLogo: FC = () => {
  const { theme, logo, title, collapsed, onLogoClick } = useLayout();

  return (
    <div
      onClick={onLogoClick}
      className={cx(
        css`
          display: flex;
          align-items: center;
          height: var(--ant-layout-header-height);
          margin-right: 28px;
          color: white;
          cursor: pointer;
          img {
            height: 32px;
          }
          h1 {
            margin: 0 0 0 12px;
            font-weight: 600;
            font-size: 18px;
            font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          }
          &.light {
            color: black;
          }
          h1.hidden {
            visibility: hidden;
          }
        `,
        { light: theme === 'light' },
      )}
    >
      {logo && <img src={logo} alt="logo" />}
      {title && <h1 className={cx({ hidden: collapsed })}>{title}</h1>}
    </div>
  );
};

export default memo(HeaderLogo);
