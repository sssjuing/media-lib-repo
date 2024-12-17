import { expect, test } from 'vitest';
import { RouteObjectWithMeta } from '../routes';
import getRouteData from './getRouteData';

const routes: RouteObjectWithMeta[] = [
  {
    path: '/',
    metadata: { name: '首页' },
    children: [
      { index: true, element: <></> },
      { path: 'home', metadata: { name: '首页', auth: ['user'] }, element: <></> },
      {
        path: 'tasks',
        children: [
          { index: true, metadata: { name: '任务列表' } },
          {
            path: ':taskId',
            metadata: { hideInMenu: true },
            children: [
              { index: true, metadata: { name: '任务详情' }, element: <></> },
              {
                path: 'subtasks',
                children: [
                  { index: true, metadata: { name: '子任务列表' }, element: <></> },
                  { path: ':subtaskId', metadata: { name: '子任务详情' }, element: <></> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'projects',
        metadata: { name: '项目列表' },
        children: [
          { index: true, element: <></> },
          {
            path: ':projectId/content',
            metadata: { name: '项目详情', hideInMenu: true },
            element: <></>,
          },
          {
            path: ':projectId/subprojects',
            metadata: { name: '子项目列表' },
            children: [
              { index: true, element: <></> },
              {
                path: ':subprojectId/content',
                metadata: { name: '子项目详情' },
                element: <></>,
              },
            ],
          },
        ],
      },
      {
        path: 'sub1',
        metadata: { name: 'Sub 1', auth: ['admin'] },
        children: [
          {
            path: 'g1',
            metadata: { name: 'Group 1' },
            children: [{ path: ':id', metadata: { name: 'Group 1 Details' }, element: <></> }],
          },
        ],
      },
      {
        path: 'sub2',
        metadata: { name: 'Sub 2' },
        children: [
          { path: 'g2/:id', metadata: { name: 'Group 2 Details' }, element: <></> },
          {
            path: ':id/details',
            metadata: { name: 'Sub 2 Details' },
            element: <></>,
          },
        ],
      },
    ],
  },
];

test('测试 getRouteData', () => {
  expect(getRouteData(routes)).toEqual([
    {
      path: '/',
      name: '首页',
      reachable: true,
      children: [
        { path: 'home', name: '首页', auth: ['user'], reachable: true },
        {
          path: 'tasks',
          name: '任务列表',
          reachable: true,
          children: [
            {
              path: ':taskId',
              name: '任务详情',
              hideInMenu: true,
              reachable: true,
              children: [
                {
                  path: 'subtasks',
                  name: '子任务列表',
                  reachable: true,
                  children: [{ path: ':subtaskId', name: '子任务详情', reachable: true }],
                },
              ],
            },
          ],
        },
        {
          path: 'projects',
          name: '项目列表',
          reachable: true,
          children: [
            { path: ':projectId/content', name: '项目详情', hideInMenu: true, reachable: true },
            {
              path: ':projectId/subprojects',
              name: '子项目列表',
              reachable: true,
              children: [{ path: ':subprojectId/content', name: '子项目详情', reachable: true }],
            },
          ],
        },
        {
          path: 'sub1',
          name: 'Sub 1',
          auth: ['admin'],
          children: [
            {
              path: 'g1',
              name: 'Group 1',
              children: [{ path: ':id', name: 'Group 1 Details', reachable: true }],
            },
          ],
        },
        {
          path: 'sub2',
          name: 'Sub 2',
          children: [
            { path: 'g2/:id', name: 'Group 2 Details', reachable: true },
            { path: ':id/details', name: 'Sub 2 Details', reachable: true },
          ],
        },
      ],
    },
  ]);
});
