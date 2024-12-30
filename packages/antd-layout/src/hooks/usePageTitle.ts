import { useMemo } from 'react';
import { pathToRegexp } from 'path-to-regexp';
import { useRoute } from '../LayoutRouteProvider';

export const usePageTitle = () => {
  const values = useRoute();
  if (values === null) {
    throw 'usePageTitle should be placed under LayoutRouteProvider';
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
