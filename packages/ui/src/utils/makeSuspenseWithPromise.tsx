import { FC, PropsWithChildren, Suspense, SuspenseProps } from 'react';

function wrapPromise<T>(promise: Promise<T>) {
  let status: 'pending' | 'success' | 'error' = 'pending';
  let result: T;
  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    },
  );

  return {
    read: () => {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw result;
        default:
          return result;
      }
    },
  };
}

export const makeSuspenseWithPromise = <T,>(promise: Promise<T>) => {
  const resource = wrapPromise(promise);

  const Inner: FC<PropsWithChildren> = ({ children }) => {
    const res = resource.read();
    console.log(res);
    return children;
  };

  // eslint-disable-next-line react/display-name
  return (props: SuspenseProps) => (
    <Suspense {...props}>
      <Inner>{props.children}</Inner>
    </Suspense>
  );
};
