import { BreadcrumbProps as AntdBreadcrumbProps } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import { RouteItem } from '../../interface';
import { urlToList } from '../../utils/utils';

export default function getBreadcrumbItems(
  pathRouteMap: Record<string, RouteItem>,
  pathname?: string,
): AntdBreadcrumbProps['items'] {
  if (!pathname) {
    return [];
  }
  const result = [];
  const urlList = urlToList(pathname);
  urlList.unshift('/');
  for (const url of urlList) {
    innerloop: for (const key in pathRouteMap) {
      const { regexp } = pathToRegexp(key);
      if (regexp.test(url)) {
        result.push({
          path: url,
          title: pathRouteMap[key]?.name,
          className: pathRouteMap[key]?.reachable ? 'clickable' : undefined,
        });
        break innerloop;
      }
    }
  }
  return result;
}
