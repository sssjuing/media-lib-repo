import { expect, test } from 'vitest';
import { RouteItem } from '../../interface';
import getBreadcrumbItems from './getBreadcrumbItems';

const pathRouteMap = {
  '/': { name: '首页' },
  '/tasks': { name: '任务列表' },
  '/tasks/:taskId': { name: '任务详情' },
  '/tasks/:taskId/subtasks': { name: '子任务列表' },
  '/tasks/:taskId/subtasks/:subtaskId': { name: '子任务详情' },
  '/projects': { name: '项目列表' },
  '/projects/:projectId/content': { name: '项目详情' },
  '/projects/:projectId/subprojects': { name: '子项目列表' },
  '/projects/:projectId/subprojects/:subprojectId/content': { name: '子项目详情' },
} as unknown as Record<string, RouteItem>;

test('测试 getBreadcrumbItems', () => {
  expect(getBreadcrumbItems(pathRouteMap, '/tasks')).toEqual([
    { path: '/', title: '首页' },
    { path: '/tasks', title: '任务列表' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/tasks/32')).toEqual([
    { path: '/', title: '首页' },
    { path: '/tasks', title: '任务列表' },
    { path: '/tasks/32', title: '任务详情' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/tasks/32/subtasks')).toEqual([
    { path: '/', title: '首页' },
    { path: '/tasks', title: '任务列表' },
    { path: '/tasks/32', title: '任务详情' },
    { path: '/tasks/32/subtasks', title: '子任务列表' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/tasks/32/subtasks/423')).toEqual([
    { path: '/', title: '首页' },
    { path: '/tasks', title: '任务列表' },
    { path: '/tasks/32', title: '任务详情' },
    { path: '/tasks/32/subtasks', title: '子任务列表' },
    { path: '/tasks/32/subtasks/423', title: '子任务详情' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/projects')).toEqual([
    { path: '/', title: '首页' },
    { path: '/projects', title: '项目列表' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/projects/32/content')).toEqual([
    { path: '/', title: '首页' },
    { path: '/projects', title: '项目列表' },
    { path: '/projects/32/content', title: '项目详情' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/projects/32/subprojects')).toEqual([
    { path: '/', title: '首页' },
    { path: '/projects', title: '项目列表' },
    { path: '/projects/32/subprojects', title: '子项目列表' },
  ]);

  expect(getBreadcrumbItems(pathRouteMap, '/projects/32/subprojects/24/content')).toEqual([
    { path: '/', title: '首页' },
    { path: '/projects', title: '项目列表' },
    { path: '/projects/32/subprojects', title: '子项目列表' },
    { path: '/projects/32/subprojects/24/content', title: '子项目详情' },
  ]);
});
