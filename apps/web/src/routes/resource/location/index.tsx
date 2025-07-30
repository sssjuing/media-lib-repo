import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/location/')({
  staticData: { name: '场所管理', weight: 3 },
  beforeLoad: () => {
    throw redirect({ to: '/resource/suppliers/inside' });
  },
});
