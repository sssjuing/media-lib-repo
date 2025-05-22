import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';

export function useUrlParams<T extends Record<string, string | number>>(initialValue: T) {
  const [searchParams, setSearchParams] = useSearchParams();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current && searchParams.size === 0) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(initialValue)) {
        params.set(k, v as string);
      }
      setSearchParams(params);
    }
    return () => {
      mountedRef.current = true;
    };
  }, [initialValue, searchParams.size, setSearchParams]);

  const setValue = (inputVal: Partial<T>) => {
    for (const [k, v] of Object.entries(inputVal)) {
      searchParams.set(k, v as string);
    }
    setSearchParams(searchParams);
  };

  const value = Object.fromEntries(searchParams) as { [p in keyof T]: string };
  return { value, setValue };
}
