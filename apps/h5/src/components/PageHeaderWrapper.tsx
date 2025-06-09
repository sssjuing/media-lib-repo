import { FC, ReactNode } from 'react';
import { NavBar } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/es/components/nav-bar';

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
      <div className="p-4">{children}</div>
    </div>
  );
};

export default PageHeaderWrapper;
