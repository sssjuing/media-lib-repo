import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Exception } from '@repo/ui';
import { NotFound } from '@/components/not-found';
import { MainLayout } from '@/layouts/main-layout';

interface RouterContext {
  queryClient?: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  staticData: { name: '' },
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: () => <Exception type={500} title="请求错误" className="mt-20" />,
});

function RootComponent() {
  return (
    <>
      <MainLayout>
        <Outlet />
      </MainLayout>
      <TanStackRouterDevtools />
    </>
  );
}
