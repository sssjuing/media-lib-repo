import { Navigate, RouteObject } from 'react-router';
import { HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { WithMeta } from '@repo/antd-layout';
import NotFound from '@/components/NotFound';
import actressesRoutes from '@/pages/actresses/routes';
import HomePage from '@/pages/home';
import videosRoutes from '@/pages/videos/routes';

const routes: WithMeta<RouteObject>[] = [
  { index: true, element: <Navigate to="home" replace /> },
  {
    path: '/home',
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
];

export default routes;
