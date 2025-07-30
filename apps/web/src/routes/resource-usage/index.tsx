import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/resource-usage/')({
  staticData: { name: '资源占用', weight: 3 },
});
