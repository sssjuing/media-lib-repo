import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource/equipment/')({
  staticData: { name: '设备管理', weight: 7 },
});
