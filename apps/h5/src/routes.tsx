import { Navigate, RouteObject } from 'react-router';
import MainLayout from '@/layouts/MainLayout';
import NotFound from '@/pages/404';
import ActressesLayout from '@/pages/actresses/_layout';
import Files from '@/pages/files';
import Home from '@/pages/home';
import Music from '@/pages/music';
import Videos from '@/pages/videos';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
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
