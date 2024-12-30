import { Navigate, RouteObject } from 'react-router-dom';
import { HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { ElementOf, RouteMeta, WithMeta } from '@repo/antd-layout';
import BasicLayout from '@/BasicLayout';
import NotFound from '@/components/NotFound';
import HomePage from '@/pages/home';
import actressesRoutes from '@/pages/actresses/routes';
import videosRoutes from '@/pages/videos/routes';

export type RouteObjectWithMeta = { metadata?: RouteMeta } & {
  [K in keyof RouteObject]: K extends 'children'
    ? WithMeta<ElementOf<RouteObject[K]>>[]
    : RouteObject[K];
};

const routes: RouteObjectWithMeta[] = [
  {
    path: '/',
    element: <BasicLayout />,
    metadata: { name: '首页' },
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: 'home',
        metadata: { name: '首页', icon: <HomeOutlined /> },
        element: <HomePage />,
      },
      {
        path: '/actresses',
        metadata: { name: '演员', icon: <UserOutlined />, hideChildrenInMenu: true },
        children: actressesRoutes,
      },
      {
        path: '/videos',
        metadata: { name: '视频', icon: <VideoCameraOutlined />, hideChildrenInMenu: true },
        children: videosRoutes,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
