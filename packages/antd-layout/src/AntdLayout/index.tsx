import { FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Layout } from 'antd';
import { LayoutRouteProvider, LayoutRouteProviderProps } from '../LayoutRouteProvider';
import Header from './Header';
import SiderMenu from './SiderMenu';
import { TopNavHeaderProps } from './TopNavHeader';
import { LayoutProvider, LayoutProviderProps, useLayout } from './useLayout';

const { Content } = Layout;

type AntdLayoutProps = TopNavHeaderProps;

const AntdLayout: FC<PropsWithChildren<AntdLayoutProps>> = (props) => {
  const { children } = props;

  const { topMenu } = useLayout();

  const layout = (
    <Layout
      className={css`
        min-height: 100vh;
      `}
    >
      {!topMenu && (
        <SiderMenu
          className={css`
            z-index: 2;
            box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
          `}
        />
      )}
      <Layout>
        <Header {...props} />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );

  return <div>{layout}</div>;
};

type AntdLayoutWrapperProps = PropsWithChildren<AntdLayoutProps> &
  LayoutProviderProps &
  Omit<LayoutRouteProviderProps, 'currentAuth'>;

const AntdLayoutWrapper = ({
  children,
  rootPath,
  title,
  routeData,
  pathname,
  currentUser,
  ...restLayoutProps
}: AntdLayoutWrapperProps) => (
  <LayoutRouteProvider
    rootPath={rootPath}
    title={title}
    routeData={routeData}
    pathname={pathname}
    currentAuth={currentUser?.auth}
  >
    <LayoutProvider title={title} currentUser={currentUser} {...restLayoutProps}>
      <AntdLayout>{children}</AntdLayout>
    </LayoutProvider>
  </LayoutRouteProvider>
);

export { AntdLayoutWrapper as AntdLayout };
export type { AntdLayoutWrapperProps as AntdLayoutProps };
