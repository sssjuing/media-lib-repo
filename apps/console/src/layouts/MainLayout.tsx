import { FC, PropsWithChildren, useMemo } from 'react';
import { Outlet, RouteObject, useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { AntdLayout, WithMeta, useAuth, usePageTitle } from '@repo/antd-layout';
import getRouteData from '@/utils/getRouteData';
import logo from '@/assets/logo.svg';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const { Authorize, Forbidden } = useAuth();
  const pageTitle = usePageTitle();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Authorize noMatch={<Forbidden />}>{children}</Authorize>
    </>
  );
};

export interface MainLayoutProps {
  routes: WithMeta<RouteObject>[];
}

const MainLayout: FC<MainLayoutProps> = ({ routes }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // 如果 MainLayout 上一级有动态路由, 这里 rootPath 应写入 useParams 中获取的动态路由值
  const rootPath = '/';

  const routeData = useMemo(() => {
    return getRouteData([{ path: rootPath, metadata: { name: '首页' }, children: routes }]);
  }, [rootPath, routes]);

  return (
    <div className="min-w-[800px]">
      <AntdLayout
        rootPath={rootPath}
        theme="dark"
        logo={logo}
        siderWidth={230}
        title="媒体库"
        pathname={pathname}
        routeData={routeData}
        onMenuClick={({ key }) => pathname !== key && navigate(key)}
        onLogoClick={() => navigate('/')}
        currentUser={{
          id: 12,
          name: 'Serati Ma',
          auth: ['admin', 'user'],
        }}
        // accordion
      >
        <Wrapper>
          <Outlet />
        </Wrapper>
      </AntdLayout>
    </div>
  );
};

export default MainLayout;
