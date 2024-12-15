import { Navigate, RouteObject } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { ElementOf, RouteMeta, WithMeta } from '@repo/route-layout';
import BasicLayout from '@/BasicLayout';
import HomePage from '@/pages/home';
import Page from '@/pages/page';
import NotFound from './components/NotFound';

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
      { path: 'home', metadata: { name: '首页', auth: ['user'] }, element: <HomePage /> },
      {
        path: 'tasks',
        children: [
          { index: true, metadata: { name: '任务列表' }, element: <Page /> },
          {
            path: ':taskId',
            metadata: { hideInMenu: true },
            children: [
              { index: true, metadata: { name: '任务详情' }, element: <Page /> },
              {
                path: 'subtasks',
                children: [
                  { index: true, metadata: { name: '子任务列表' }, element: <Page /> },
                  { path: ':subtaskId', metadata: { name: '子任务详情' }, element: <Page /> },
                  //
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'projects',
        metadata: {
          name: '项目列表',
          hideChildrenInMenu: true,
        },
        children: [
          { index: true, element: <Page /> },
          {
            path: ':projectId/content',
            metadata: { name: '项目详情' },
            element: <Page />,
          },
          {
            path: ':projectId/subprojects',
            metadata: { name: '子项目列表' },
            children: [
              { index: true, element: <Page /> },
              {
                path: ':subprojectId/content',
                metadata: { name: '子项目详情' },
                element: <Page />,
              },
            ],
          },
        ],
      },
      {
        path: 'sub1',
        metadata: { name: 'Sub 1', auth: ['admin'], icon: <MailOutlined /> },
        children: [
          {
            path: 'g1',
            metadata: { name: 'Group 1', icon: <MailOutlined /> },
            children: [{ path: ':id', metadata: { name: 'Group 1 Details' }, element: <Page /> }],
          },
        ],
      },
      {
        path: 'sub2',
        metadata: { name: 'Sub 2', icon: <MailOutlined /> },
        children: [
          { path: 'g2/:id', metadata: { name: 'Group 2 Details' }, element: <Page /> },
          {
            path: ':id/details',
            metadata: { name: 'Sub 2 Details' },
            element: <Page />,
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
