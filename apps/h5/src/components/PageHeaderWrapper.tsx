import { FC, ReactNode } from 'react';
import { NavBar } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/es/components/nav-bar';
import { css } from '@emotion/css';

interface PageHeaderWrapperProps extends NavBarProps {
  title?: string;
  children?: ReactNode;
}

const PageHeaderWrapper: FC<PageHeaderWrapperProps> = ({ title, children, ...restProps }) => {
  return (
    <div>
      <NavBar style={{ borderBottom: '1px solid #444' }} {...restProps}>
        {title}
      </NavBar>
      <div
        className={css`
          padding: 1rem;
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default PageHeaderWrapper;
