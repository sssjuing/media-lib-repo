import { createContext, FC, PropsWithChildren, useContext, useMemo } from 'react';
import { RouteItem } from '../interface';
import { getMenuItems, getPathRouteMap, joinRoutesPath } from './utils';

export interface LayoutRouteProviderProps {
  rootPath: string;
  title?: string;
  routeData?: RouteItem[];
  pathname?: string;
  currentAuth?: string[];
}

const useValues = ({ rootPath, routeData, currentAuth, ...restProps }: LayoutRouteProviderProps) => {
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

const LayoutRouteContext = createContext<ReturnType<typeof useValues>>(null!);

export const LayoutRouteProvider: FC<PropsWithChildren<LayoutRouteProviderProps>> = ({ children, ...restProps }) => {
  return <LayoutRouteContext.Provider value={useValues(restProps)}>{children}</LayoutRouteContext.Provider>;
};

export const useRoute = () => {
  const values = useContext(LayoutRouteContext);
  if (values === null) {
    throw 'useRoute should be placed under LayoutRouteProvider';
  }
  return values;
};
