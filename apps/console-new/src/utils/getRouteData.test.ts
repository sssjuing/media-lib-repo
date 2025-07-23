import { createRouter } from '@tanstack/react-router';
import { test } from 'vitest';
import { routeTree } from '@/routeTree.gen';
import getRouteData, { Route, flatRoutes } from './getRouteData';

test('测试 flatRoutes', () => {
  const router = createRouter({ routeTree, basepath: '/console', context: {} });
  const routes = flatRoutes(router.options.routeTree?.children as unknown as Route[]);
  routes.map((i) => {
    console.log(i.path, i.fullPath);
  });
});

test('测试 getRouteData', () => {
  const router = createRouter({ routeTree, basepath: '/console', context: {} });
  const routes = flatRoutes(router.options.routeTree?.children as unknown as Route[]);
  const routeData = getRouteData(routes);
  console.log(JSON.stringify(routeData, null, 2));
});
