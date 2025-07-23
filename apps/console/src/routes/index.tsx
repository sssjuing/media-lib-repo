import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  staticData: { name: '首页' },
  beforeLoad: () => {
    throw redirect({ to: '/home' });
  },
});
