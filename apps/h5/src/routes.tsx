import { Navigate, RouteObject } from 'react-router-dom';
import BasicLayout from '@/layouts/BasicLayout';
import NotFound from '@/pages/404';
import Home from '@/pages/home';
import Music from '@/pages/music';
import ActressesLayout from '@/pages/actresses/_layout';
import Videos from '@/pages/videos';
import Files from '@/pages/files';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '/home', element: <Home /> },
      { path: '/music', element: <Music /> },
      { path: '/actresses/*', element: <ActressesLayout /> },
      { path: '/videos', element: <Videos /> },
      { path: '/files/*', element: <Files /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
