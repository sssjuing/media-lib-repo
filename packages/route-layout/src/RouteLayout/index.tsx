import { FC, PropsWithChildren } from 'react';
import { css } from '@emotion/css';
import { Layout } from 'antd';
import { RouteProvider, RouteProviderProps } from '../RouteProvider';
import { TopNavHeaderProps } from './TopNavHeader';
import SiderMenu from './SiderMenu';
import Header from './Header';
import { LayoutProvider, LayoutProviderProps, useLayout } from './useLayout';

const { Content } = Layout;

type RouteLayoutProps = TopNavHeaderProps;

const RouteLayout: FC<PropsWithChildren<RouteLayoutProps>> = (props) => {
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
            z-index: 10;
            box-shadow: 1px 0 4px rgba(0, 21, 41, 0.2);
          `}
        />
      )}
      <Layout>
        <Header {...props} />
        <Content
          className={css`
            padding: calc(var(--ant-layout-header-height) * 3 / 8);
          `}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );

  return <div>{layout}</div>;
};

type RouteLayoutWrapperProps = PropsWithChildren<RouteLayoutProps> &
  LayoutProviderProps &
  Omit<RouteProviderProps, 'currentAuth'>;

const RouteLayoutWrapper = ({
  children,
  rootPath,
  title,
  routeData,
  pathname,
  currentUser,
  ...restLayoutProps
}: RouteLayoutWrapperProps) => (
  <RouteProvider
    rootPath={rootPath}
    title={title}
    routeData={routeData}
    pathname={pathname}
    currentAuth={currentUser?.auth}
  >
    <LayoutProvider title={title} currentUser={currentUser} {...restLayoutProps}>
      <RouteLayout>{children}</RouteLayout>
    </LayoutProvider>
  </RouteProvider>
);

export { RouteLayoutWrapper as RouteLayout };
export type { RouteLayoutWrapperProps as RouteLayoutProps };
