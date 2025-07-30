import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/plans/')({
  staticData: { name: '计划管理', weight: 2 },
});
