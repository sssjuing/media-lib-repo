import { ReactNode } from 'react';

export interface MenuItem {
  key: string;
  label?: string;
  icon?: ReactNode;
  children?: MenuItem[];
}
