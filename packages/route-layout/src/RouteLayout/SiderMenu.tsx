import { FC } from 'react';
import { css, cx } from '@emotion/css';
import { Layout } from 'antd';
import LayoutMenu from './LayoutMenu';
import HeaderLogo from './HeaderLogo';
import { useLayout } from './useLayout';

const { Sider } = Layout;

export interface SiderMenuProps {
  className?: string;
}

const SiderMenu: FC<SiderMenuProps> = (props) => {
  const { className } = props;
  const { theme, logo, title, siderWidth, collapsed } = useLayout();

  return (
    <Sider width={siderWidth} collapsed={collapsed} theme={theme} breakpoint="md" className={className}>
      {(logo || title) && (
        <div
          className={cx(
            css`
              position: relative;
              height: var(--ant-layout-header-height);
              padding-left: calc((80px - 32px) / 2);
              overflow: hidden;
              line-height: var(--ant-layout-header-height);
              background-color: #002140;
              transition: all 0.3s;

              &.light {
                background-color: #ffffff;
                box-shadow: 0 1px 4px rgba(0, 21, 41, 0.2);
              }
            `,
            { light: theme === 'light' },
          )}
        >
          <HeaderLogo />
        </div>
      )}
      <LayoutMenu />
    </Sider>
  );
};

export default SiderMenu;
