import { useMemo } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { useRoute } from '../RouteProvider';

export const usePageTitle = () => {
  const values = useRoute();
  if (values === null) {
    throw 'usePageTitle should be placed under RouteProvider';
  }
  const { pathRouteMap, title, pathname } = values;
  const routeName = useMemo(() => {
    if (!pathname) {
      return;
    }
    for (const path in pathRouteMap) {
      if (pathToRegexp(path).test(pathname)) {
        return pathRouteMap[path]?.name;
      }
    }
  }, [pathRouteMap, pathname]);
  return routeName ? `${routeName} - ${title}` : title;
};
