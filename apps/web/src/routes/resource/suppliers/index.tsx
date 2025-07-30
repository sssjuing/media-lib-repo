import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/suppliers/')({
  staticData: { name: '供应商管理', weight: 1 },
  beforeLoad: () => {
    throw redirect({ to: '/resource/suppliers/inside' });
  },
});
