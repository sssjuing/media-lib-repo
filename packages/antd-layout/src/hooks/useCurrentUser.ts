import { useLayout } from '../AntdLayout/useLayout';

export const useCurrentUser = () => {
  const { currentUser } = useLayout();
  return currentUser;
};
