import { FC, PropsWithChildren, ReactNode } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { RouteItem } from '../../interface';
import { useRoute } from '../../LayoutRouteProvider';
import { checkPermissions } from './utils';

export function getRouteAuth(routes: readonly RouteItem[] = [], pathname: string = ''): string[] {
  let authorities: string[] = [];
  const callback = (list: readonly RouteItem[]) => {
    list.forEach((item) => {
      if (pathToRegexp(`${item.path}(.*)`).test(pathname)) {
        authorities = item.auth || authorities;
        if (item.children) {
          callback(item.children);
        }
      }
    });
  };
  callback(routes);
  return authorities;
}

export interface AuthorizeProps {
  noMatch: ReactNode;
}

export const Authorize: FC<PropsWithChildren<AuthorizeProps>> = ({ noMatch, children }) => {
  const { routes, pathname, currentAuth } = useRoute();

  const routeAuth = getRouteAuth(routes, pathname);

  const dom = checkPermissions(children, noMatch, routeAuth, currentAuth);

  return <>{dom}</>;
};
