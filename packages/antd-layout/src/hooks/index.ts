import { useRoute } from '../LayoutRouteProvider';
import { useAuth } from './useAuth';
import { useCurrentUser } from './useCurrentUser';
import { usePageTitle } from './usePageTitle';

const Hooks = {
  useRoute,
  useAuth,
  useCurrentUser,
  usePageTitle,
};

export {
  Hooks as default,
  //
  useRoute,
  useAuth,
  useCurrentUser,
  usePageTitle,
};
