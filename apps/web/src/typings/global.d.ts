type WithNull<T> = T | null;

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type Common<T, U> = { [K in keyof T & keyof U]: T[K] | U[K] };

type PartialPick<T, K extends keyof T> = { [key in keyof T]: key extends K ? T[key] : T[key] | undefined };
