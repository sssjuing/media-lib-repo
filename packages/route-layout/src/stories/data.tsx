import { BarChartOutlined, MailOutlined } from '@ant-design/icons';
import { RouteItem } from '../interface';

export const routeData: RouteItem[] = [
  {
    path: '/',
    name: '首页',
    children: [
      {
        path: '/tasks',
        name: '任务列表',
        children: [
          {
            path: '/tasks/:taskId',
            name: '任务详情',
            hideInMenu: true,
            children: [
              {
                path: '/tasks/:taskId/subtasks',
                name: '子任务列表',
                children: [{ path: '/tasks/:taskId/subtasks/:subtaskId', name: '子任务详情' }],
              },
            ],
          },
        ],
      },
      {
        path: '/projects',
        name: '项目列表',
        auth: ['manager'],
        hideChildrenInMenu: true,
        children: [
          { path: '/projects/:projectId/content', name: '项目详情' },
          {
            path: '/projects/:projectId/subprojects',
            name: '子项目列表',
            children: [
              {
                path: '/projects/:projectId/subprojects/:subprojectId/content',
                name: '子项目详情',
              },
            ],
          },
        ],
      },
      {
        path: 'sub1',
        name: 'Navigation One',
        auth: ['admin'],
        icon: <MailOutlined />,
        children: [
          {
            path: 'g1',
            name: 'Item 1',
            auth: ['user', 'admin'],
            children: [
              { path: '1', name: 'Option 1' },
              { path: '2', name: 'Option 2' },
            ],
          },
          {
            path: 'g2',
            name: 'Item 2',
            auth: ['admin'],
            children: [
              { path: '3', name: 'Option 3' },
              { path: '4', name: 'Option 4' },
            ],
          },
        ],
      },
      {
        path: 'sub2',
        name: 'Navigation Two',
        auth: ['user'],
        icon: <BarChartOutlined />,
        children: [
          {
            path: 'g3',
            name: 'Item 3',
            auth: ['user'],
            children: [
              { path: '5', name: 'Option 5' },
              { path: '6', name: 'Option 6' },
            ],
          },
        ],
      },
    ],
  },
];
