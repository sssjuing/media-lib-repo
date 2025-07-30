import { Component } from 'react';
import { StaticDataRouteOption } from '@tanstack/react-router';
import { RouteItem } from '@repo/antd-layout';

export type Route = {
  id: string;
  path: string;
  fullPath: string;
  options: {
    staticData: StaticDataRouteOption;
    component?: Component;
  };
  children?: Route[];
};

// function splitByFirstChar(str: string, char: string) {
//   const index = str.indexOf(char);
//   if (index === -1) {
//     return [str, '']; // 分隔符不存在，返回原字符串和空字符串
//   }
//   return [str.slice(0, index), str.slice(index + 1)];
// }

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
    // if (route.path) {
    //   result.push({ id: route.id, path: route.path, fullPath: route.fullPath, options: route.options });
    // }
    if (route.children) {
      route.children
        .sort((a, b) => (a.options.staticData.weight || 0) - (b.options.staticData.weight || 0))
        .forEach((i) => {
          queue.unshift({ id: i.id, path: i.path, fullPath: i.fullPath, options: i.options, children: i.children });
        });
    } else {
      result.push({ id: route.id, path: route.path, fullPath: route.fullPath, options: route.options });
    }
  }
  return result;
}

export default function getRouteData(routes: Route[] = []): RouteItem[] {
  const sortedRoutes = routes
    .map((i) => {
      const cleanPath = i.fullPath.replace(/^\/+|\/+$/g, '');
      return { ...i, tmp: { cleanPath, pathLen: cleanPath.split('/').length } };
    })
    .filter((i) => i.tmp.cleanPath !== '')
    .sort((a, b) => a.tmp.pathLen - b.tmp.pathLen)
    .map(({ tmp, ...rest }) => ({ ...rest, fullPath: tmp.cleanPath }));
  const root = { path: '/', children: [] } as unknown as RouteItem;
  for (const route of sortedRoutes) {
    const parts = route.fullPath.split('/');
    let currentPath = '';
    let currentNode = root;
    for (let i = 0; i < parts.length; i++) {
      currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
      const target = currentNode.children?.find((r) => r.path === parts[i].replace('$', ':'));
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
