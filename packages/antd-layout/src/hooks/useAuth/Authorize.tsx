import { FC, PropsWithChildren, ReactNode } from 'react';
import { useRoute } from '../../LayoutRouteProvider';
import { checkPermissions, getRouteAuth } from './utils';

export interface AuthorizeProps {
  noMatch: ReactNode;
}

export const Authorize: FC<PropsWithChildren<AuthorizeProps>> = ({ noMatch, children }) => {
  const { routes, pathname, currentAuth } = useRoute();

  const routeAuth = getRouteAuth(routes, pathname);

  const dom = checkPermissions(children, noMatch, routeAuth, currentAuth);

  return <>{dom}</>;
};
