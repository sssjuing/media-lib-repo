import { createContext, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { RouteItem } from '../interface';
import { getMenuItems, getPathRouteMap, joinRoutesPath } from './utils';

export interface RouteProviderProps {
  rootPath: string;
  title?: string;
  routeData?: RouteItem[];
  pathname?: string;
  currentAuth?: string[];
}

const useValues = ({ rootPath, routeData, currentAuth, ...restProps }: RouteProviderProps) => {
  const routes = useMemo(() => Object.freeze(joinRoutesPath(routeData, '/')), [routeData]); // TODO: 尝试用 immutable 处理

  const pathRouteMap = useMemo(() => getPathRouteMap(routes), [routes]);

  const menuItems = useMemo(
    () => getMenuItems(pathRouteMap[rootPath]?.children ?? [], currentAuth),
    [rootPath, routes, currentAuth],
  );

  return {
    ...restProps,
    currentAuth,
    routes,
    menuItems,
    pathRouteMap,
  };
};

const RouteContext = createContext<ReturnType<typeof useValues>>(null!);

export const RouteProvider: FC<PropsWithChildren<RouteProviderProps>> = ({ children, ...restProps }) => {
  return <RouteContext.Provider value={useValues(restProps)}>{children}</RouteContext.Provider>;
};

export const useRoute = () => {
  const values = useContext(RouteContext);
  if (values === null) {
    throw 'useRoute should be placed under RouteProvider';
  }
  return values;
};
