import { Component } from 'react';
import { StaticDataRouteOption } from '@tanstack/react-router';
import { RouteItem } from '@repo/antd-layout';

export type Route = {
  id: string;
  path: string;
  fullPath: string;
  options: {
    staticData?: StaticDataRouteOption;
    component?: Component;
  };
  children?: Route[];
};

export function flatRoutes(routes: Route[] = []): Route[] {
  const queue: Route[] = routes.map((i) => ({
    id: i.id,
    path: i.path,
    fullPath: i.fullPath,
    options: i.options,
    children: i.children,
  }));
  const result: Route[] = [];
  while (queue.length > 0) {
    const route = queue.shift()!;
    if (route.children) {
      route.children.forEach((i) => {
        queue.unshift({ id: i.id, path: i.path, fullPath: i.fullPath, options: i.options, children: i.children });
      });
    } else {
      result.push({ id: route.id, path: route.path, fullPath: route.fullPath, options: route.options });
    }
  }
  return result;
}

export function getRouteData(routes: Route[] = []): RouteItem[] {
  const sortedRoutes = routes
    .map((i) => {
      const cleanPath = i.fullPath.replace(/^\/+|\/+$/g, ''); // 去除两端的斜杠
      return { ...i, tmp: { cleanPath, pathLen: cleanPath.split('/').length } };
    })
    .filter((i) => i.tmp.cleanPath !== '')
    // 先按路径深度排序, 同样深度按 weight 权重排序
    .sort((a, b) => {
      if (a.tmp.pathLen !== b.tmp.pathLen) {
        return a.tmp.pathLen - b.tmp.pathLen;
      }
      return (a.options.staticData?.weight ?? 1_000) - (b.options.staticData?.weight ?? 1_000);
    })
    .map(({ tmp, ...rest }) => ({ ...rest, fullPath: tmp.cleanPath }));
  const root = { path: '/', children: [] } as unknown as RouteItem;
  for (const route of sortedRoutes) {
    const parts = route.fullPath.split('/');
    let currentPath = '';
    let currentNode = root;
    for (let i = 0; i < parts.length; i++) {
      currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
      const target = currentNode.children?.find((r) => r.path === parts[i].replace('$', ':'));
      // 跳过 splat route, 一般是 404 页面
      if (currentPath === '$') {
        continue;
      }
      if (!target) {
        if (i === parts.length - 1) {
          const item: RouteItem = {
            path: currentPath.replaceAll('$', ':'),
            reachable: !!route.options.component,
            ...route.options.staticData,
          };
          currentNode.children = currentNode.children ? [...currentNode.children, item] : [item];
        }
      } else {
        currentNode = target;
        currentPath = '';
      }
    }
  }
  return root.children!.map((i) => ({ ...i, path: '/' + i.path }));
}
