import { useLocation } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';

export function usePathname() {
  const router = useRouter();
  const location = useLocation();

  const basepath = router.options.basepath ?? '';
  const pathname = location.pathname;

  // 去掉 basepath（确保不重复）
  const relativePathname = pathname.startsWith(basepath) ? pathname.slice(basepath.length) || '/' : pathname;

  return relativePathname;
}
