import { useCallback } from 'react';
import { Exception } from '@repo/ui';
import { useRoute } from '../../LayoutRouteProvider';
import { Authorize } from './Authorize';
import { checkPermissions } from './utils';

const Forbidden = () => <Exception type={403} style={{ paddingTop: 160 }} />;

export const useAuth = () => {
  const values = useRoute();
  if (values === null) {
    throw 'useAuth should be placed under LayoutRouteProvider';
  }
  const { currentAuth } = values;
  const check = useCallback(
    <T, E>(routeAuth: string[] = [], Target: T, Exception: E) => {
      return checkPermissions(Target, Exception, routeAuth, currentAuth);
    },
    [currentAuth],
  );

  return { Forbidden, Authorize, check };
};
