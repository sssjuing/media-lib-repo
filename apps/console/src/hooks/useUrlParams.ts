import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import queryString from 'query-string';

export function useUrlParams<T extends Record<string, string | number | string[]>>(initialValue: T) {
  const [searchParams, setSearchParams] = useSearchParams();
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current && searchParams.size === 0) {
      const params = new URLSearchParams(queryString.stringify(initialValue));
      setSearchParams(params, { replace: true });
    }
    return () => {
      mountedRef.current = true;
    };
  }, [initialValue, searchParams.size, setSearchParams]);

  const setValue = useCallback(
    (inputVal: Partial<T>) => {
      const old = queryString.parse(searchParams.toString());
      setSearchParams(new URLSearchParams(queryString.stringify({ ...old, ...inputVal })));
    },
    [searchParams, setSearchParams],
  );

  const value = queryString.parse(searchParams.toString()) as {
    [p in keyof T]: T[p] extends number ? string : T[p] | undefined;
  };
  return { value, setValue };
}
