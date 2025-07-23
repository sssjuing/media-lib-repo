import { useEffect } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  staticData: { name: 'About' },
  component: About,
});

function About() {
  const router = useRouter();
  useEffect(() => {
    console.log(router.options.routeTree?.children);
  }, [router]);

  return <div className="p-2">Hello from About!</div>;
}
