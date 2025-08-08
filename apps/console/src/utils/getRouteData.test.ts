import { createRouter } from '@tanstack/react-router';
import { test } from 'vitest';
import { routeTree } from '@/routeTree.gen';
import { Route, flatRoutes, getRouteData } from './getRouteData';

test('测试 flatRoutes', { timeout: 100_000 }, () => {
  const router = createRouter({ routeTree });
  const routes = flatRoutes(router.options.routeTree?.children as unknown as Route[]);
  routes.map((i) => {
    console.log(i.path, i.fullPath);
  });
});

test('测试 getRouteData', { timeout: 100_000 }, () => {
  const router = createRouter({ routeTree });
  const routes = flatRoutes(router.options.routeTree?.children as unknown as Route[]);
  const routeData = getRouteData(routes);
  console.log(JSON.stringify(routeData, null, 2));
});
