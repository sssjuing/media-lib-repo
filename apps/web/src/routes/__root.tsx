import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Helmet } from 'react-helmet-async';
import { AntdLayout, useAuth, usePageTitle } from '@repo/antd-layout';
import NotFound from '@/components/NotFound';
import { usePathname } from '@/hooks';
import getRouteData, { Route as UtilsRoute, flatRoutes } from '@/utils/getRouteData';
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
  const pathname = usePathname();
  const navigate = Route.useNavigate();

  const routeData = useMemo(() => {
    const routes = flatRoutes(router.options.routeTree?.children as unknown as UtilsRoute[]);
    return [{ path: '/', name: '首页', reachable: true, children: getRouteData(routes) }];
  }, [router]);

  return (
    <>
      <div className="min-w-[1200px]">
        <AntdLayout
          rootPath="/"
          theme="dark"
          logo={logo}
          siderWidth={230}
          title="任务管理平台"
          pathname={pathname}
          routeData={routeData}
          onMenuClick={({ key }) => pathname !== key && navigate({ to: key })}
          // onLogoClick={() => navigate('/')}
          // currentUser={{
          //   id: 12,
          //   name: 'Serati Ma',
          //   auth: ['admin', 'user'],
          // }}
          accordion
        >
          <Wrapper>
            <Outlet />
          </Wrapper>
        </AntdLayout>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
