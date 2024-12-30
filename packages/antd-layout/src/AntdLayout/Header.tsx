import { FC } from 'react';
import { css, cx } from '@emotion/css';
import { Layout } from 'antd';
import TopNavHeader, { TopNavHeaderProps } from './TopNavHeader';
import GlobalHeader from './GlobalHeader';
import { useLayout } from './useLayout';

const { Header: AntdHeader } = Layout;

export type HeaderProps = TopNavHeaderProps;

const Header: FC<HeaderProps> = (props) => {
  const { topMenu, theme } = useLayout();

  return (
    <AntdHeader
      className={cx(
        css`
          padding: 0;
          box-shadow: #aaa 0 2px 4px;
          z-index: 1;
          &.light {
            background-color: #fff;
          }
        `,
        { light: !topMenu || theme === 'light' },
      )}
    >
      {topMenu ? <TopNavHeader {...props} /> : <GlobalHeader />}
    </AntdHeader>
  );
};

export default Header;
