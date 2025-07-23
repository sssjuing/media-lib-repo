import { useMemo } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AntdLayout } from '@repo/antd-layout';
import NotFound from '@/components/NotFound';
import getRouteData, { Route as UtilsRoute, flatRoutes } from '@/utils/getRouteData';
import logo from '@/assets/logo.svg';

interface RouterContext {
  queryClient?: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  staticData: { name: '' },
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const router = useRouter();

  const routeData = useMemo(() => {
    const routes = flatRoutes(router.options.routeTree?.children as unknown as UtilsRoute[]);
    return [{ path: '/', name: '首页', reachable: true, children: getRouteData(routes) }];
  }, [router]);

  console.log(routeData);

  return (
    <>
      <div className="min-w-[800px]">
        <AntdLayout
          rootPath="/"
          theme="dark"
          logo={logo}
          siderWidth={230}
          title="媒体库"
          // pathname={pathname}
          routeData={routeData}
          // onMenuClick={({ key }) => pathname !== key && navigate(key)}
          // onLogoClick={() => navigate('/')}
          // currentUser={{
          //   id: 12,
          //   name: 'Serati Ma',
          //   auth: ['admin', 'user'],
          // }}
          // accordion
        >
          <Outlet />
        </AntdLayout>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
