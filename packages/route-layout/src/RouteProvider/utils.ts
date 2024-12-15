import { resolve } from 'path-browserify';
import { MenuItem } from '@repo/components';
import { RouteItem } from '../interface';
import { checkPermissions } from '../hooks/useAuth/utils';

export function joinRoutesPath(routes?: RouteItem[], parentPath = '/'): RouteItem[] {
  const result: RouteItem[] = [];
  routes?.forEach(({ path, children, ...restProps }) => {
    const curPath = resolve(parentPath, path);
    const item: RouteItem = { path: curPath, ...restProps };
    if (children) {
      item.children = joinRoutesPath(children, curPath);
    }
    result.push(item);
  });
  return result;
}

/**
 *获取 route 的 path-route 映射, 方便计算面包屑组件和 page title
 * @param routes 路由树
 * @returns path-route 映射
 */
export function getPathRouteMap(routes: readonly RouteItem[]): Record<string, RouteItem> {
  const result: Record<string, RouteItem> = {};
  const callback = (list: readonly RouteItem[]) => {
    list.forEach((r) => {
      result[r.path] = r;
      if (r.children) {
        callback(r.children);
      }
    });
  };
  callback(routes);
  return result;
}

export function getMenuItems(routes: RouteItem[], currentAuth?: string[]): MenuItem[] | undefined {
  const result: MenuItem[] = [];
  routes.forEach(({ path, name, icon, children, auth, hideInMenu, hideChildrenInMenu }) => {
    if (hideInMenu) {
      return;
    }
    if (currentAuth && !checkPermissions(true, false, auth, currentAuth)) {
      return;
    }
    const menuItem: MenuItem = { key: path, label: name, icon };
    if (children && !hideChildrenInMenu) {
      menuItem.children = getMenuItems(children, currentAuth);
    }
    // 由于权限导致子菜单都被隐藏了, 则父菜单不显示
    if (!menuItem.children || menuItem.children.length > 0) {
      result.push(menuItem);
    }
  });
  return result.length === 0 ? undefined : result; // 保证回调时的返回类型逻辑正确
}
