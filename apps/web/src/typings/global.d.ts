type WithNull<T> = T | null;

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type Common<T, U> = { [K in keyof T & keyof U]: T[K] | U[K] };
