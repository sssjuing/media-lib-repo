import { RouteObject } from 'react-router';
import { RouteItem, WithMeta } from '@repo/antd-layout';

export default function getRouteData(routes: WithMeta<RouteObject>[]): RouteItem[] {
  const routeData: RouteItem[] = [];
  routes.forEach(({ path, metadata, element, children }) => {
    if (!path) {
      return;
    }
    // 如果当前route没有metadata, 去下一级找index为true的route
    const indexRoute = children?.find((i) => i.index);
    metadata = { ...metadata, ...indexRoute?.metadata };
    if (Object.keys(metadata).length === 0) {
      return;
    }
    const item: RouteItem = { path, ...metadata };
    if (indexRoute || (element && !children)) {
      item.reachable = true;
    }
    if (children) {
      item.children = getRouteData(children);
    }
    routeData.push(item);
  });
  return routeData;
}
