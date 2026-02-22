import { createFileRoute, redirect } from '@tanstack/react-router';
import { SettingOutlined } from '@ant-design/icons';

export const Route = createFileRoute('/settings/')({
  staticData: { name: 'Settings', icon: <SettingOutlined /> },
  beforeLoad: () => {
    throw redirect({ to: '/settings/tags' });
  },
});
