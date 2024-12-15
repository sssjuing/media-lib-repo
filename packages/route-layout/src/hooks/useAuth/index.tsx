import { useCallback } from 'react';
import { useRoute } from '../../RouteProvider';
import Forbidden from './Forbidden';
import { Authorize } from './Authorize';
import { checkPermissions } from './utils';

export const useAuth = () => {
  const values = useRoute();
  if (values === null) {
    throw 'useAuth should be placed under RouteProvider';
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
