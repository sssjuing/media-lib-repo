import { BookOutlined } from '@ant-design/icons';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/')({
  staticData: { name: '资源库', weight: 1, icon: <BookOutlined /> },
  beforeLoad: () => {
    throw redirect({ to: '/resource/suppliers' });
  },
});
