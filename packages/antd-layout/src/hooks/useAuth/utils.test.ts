import { expect, test } from 'vitest';

import { RouteItem } from '../../interface';
import { getRouteAuth } from './utils';

const routes: RouteItem[] = [
  {
    path: '/',
    name: '首页',
    children: [
      {
        path: '/sub1',
        name: 'Navigation One',
        auth: ['admin'],
        children: [
          {
            path: '/sub1/g1',
            name: 'Item 1',
            auth: ['user', 'admin'],
            children: [
              { path: '/sub1/g1/1', name: 'Option 1' },
              { path: '/sub1/g1/2', name: 'Option 2' },
            ],
          },
        ],
      },
    ],
  },
];

test('测试 getRouteAuth', () => {
  expect(getRouteAuth(routes, '/sub1/g1/2')).toEqual(['user', 'admin']);
});
