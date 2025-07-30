import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/')({
  staticData: { name: '资源库' },
  beforeLoad: () => {
    throw redirect({ to: '/resource/supplier' });
  },
});
