import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';

export function useRefresh(routeId: string, sync?: boolean) {
  const router = useRouter();
  const refresh = useCallback(
    () => router.invalidate({ filter: (r) => r.routeId === routeId, sync }),
    [routeId, router, sync],
  );
  return refresh;
}
