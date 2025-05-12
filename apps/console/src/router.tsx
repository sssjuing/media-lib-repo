import { RouteObject, RouterProviderProps, createBrowserRouter } from 'react-router';
import { WithMeta } from '@repo/antd-layout';
import NotFound from '@/components/NotFound';
import MainLayout from '@/layouts/MainLayout';
import routes from '@/routes';

// export type RouteObjectWithMeta = { metadata?: RouteMeta } & {
//   [K in keyof RouteObject]: K extends 'children'
//     ? WithMeta<ElementOf<RouteObject[K]>>[]
//     : RouteObject[K];
// };

const rootRoutes: WithMeta<RouteObject>[] = [
  {
    path: '/',
    element: <MainLayout routes={routes} />,
    metadata: { name: '首页' },
    children: routes,
  },
  { path: '*', element: <NotFound /> },
];

const router: RouterProviderProps['router'] = createBrowserRouter(rootRoutes as RouteObject[], {
  basename: '/console',
});

export default router;
