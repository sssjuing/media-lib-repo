import { Key, ReactNode } from 'react';

export interface CurrentUser {
  id?: Key;
  username?: string;
  auth?: string[];
  avatar?: string;
  name?: string;
  email?: string;
}

export interface RouteItem {
  path: string;
  name?: string;
  icon?: ReactNode;
  children?: RouteItem[];

  // 当前路由是否可在面包屑导航中可点击, 仅当前路由有页面时为 true(当前 route 只有 element 而无 children 或者只有 children 且其内部有 index 为 true 的路由)
  reachable?: boolean;

  auth?: string[];
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
}

export interface RouteMeta {
  name?: string;
  icon?: ReactNode;
  auth?: string[];
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
}

export type ElementOf<T> = T extends (infer U)[] ? U : never;

export type WithMeta<T> = { metadata?: RouteMeta } & {
  // [K in keyof T]: K extends 'children' ? WithMeta<T>[K] : T[K];
  [K in keyof T]: K extends 'children' ? WithMeta<ElementOf<T[K]>>[] : T[K];
};

export type WithFalse<T> = T | false;
