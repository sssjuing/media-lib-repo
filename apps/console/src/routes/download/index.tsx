import { createFileRoute, redirect } from '@tanstack/react-router';
import { DownloadOutlined } from '@ant-design/icons';

export const Route = createFileRoute('/download/')({
  staticData: { name: '视频下载', weight: 3, icon: <DownloadOutlined /> },

  beforeLoad: () => {
    throw redirect({ to: '/home' });
  },
});
