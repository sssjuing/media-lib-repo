import { expect, test } from 'vitest';
import { RouteItem } from '../interface';
import { getMenuItems, getPathRouteMap, joinRoutesPath } from './utils';

const routes: RouteItem[] = [
  { path: '1', name: 'Option 1', auth: ['user'] },
  {
    path: 'sub1',
    name: 'Navigation One',
    auth: ['admin'],
    hideChildrenInMenu: true,
    children: [{ path: '5', name: 'Option 5' }],
  },
  {
    path: 'sub2',
    name: 'Navigation Two',
    auth: ['user', 'admin'],
    children: [
      { path: '9', name: 'Option 9' },
      {
        path: 'sub3',
        name: 'Submenu',
        hideInMenu: true,
        children: [{ path: '11', name: 'Option 11' }],
      },
    ],
  },
];

test('测试 joinMenuItemspath', () => {
  expect(joinRoutesPath(routes)).toEqual([
    { path: '/1', name: 'Option 1', auth: ['user'] },
    {
      path: '/sub1',
      name: 'Navigation One',
      auth: ['admin'],
      hideChildrenInMenu: true,
      children: [{ path: '/sub1/5', name: 'Option 5' }],
    },
    {
      path: '/sub2',
      name: 'Navigation Two',
      auth: ['user', 'admin'],
      children: [
        { path: '/sub2/9', name: 'Option 9' },
        {
          path: '/sub2/sub3',
          name: 'Submenu',
          hideInMenu: true,
          children: [{ path: '/sub2/sub3/11', name: 'Option 11' }],
        },
      ],
    },
  ]);
});

test('测试 getPathRouteMap', () => {
  const routes = [
    {
      path: '/',
      name: '首页',
      children: [{ path: '/tasks', name: '任务列表' }],
    },
  ];
  expect(getPathRouteMap(routes)).toEqual({
    '/': { path: '/', name: '首页', children: [{ path: '/tasks', name: '任务列表' }] },
    '/tasks': { path: '/tasks', name: '任务列表' },
  });
});

test('测试 getMenuItems', () => {
  expect(getMenuItems(joinRoutesPath(routes), ['admin'])).toEqual([
    { key: '/sub1', label: 'Navigation One' },
    { key: '/sub2', label: 'Navigation Two', children: [{ key: '/sub2/9', label: 'Option 9' }] },
  ]);
});
