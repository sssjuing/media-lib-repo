import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/supplier/')({
  staticData: { name: '供应商管理' },
  beforeLoad: () => {
    throw redirect({ to: '/resource/supplier/inside' });
  },
});
