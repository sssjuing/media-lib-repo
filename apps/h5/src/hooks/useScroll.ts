import { useEffect, useState } from 'react';
import { sleep } from '@repo/service';

export function useScroll<T>(data: T[] = [], step = 10) {
  const [cursor, setCursor] = useState(step);

  useEffect(() => {
    if (data.length > 0) {
      setCursor(10);
    }
  }, [data]);

  const loadMore = async () => {
    await sleep(200);
    if (cursor < data.length) {
      setCursor(cursor + step);
    }
  };

  return { data: data.slice(0, cursor), loadMore, hasMore: data.length > cursor };
}
