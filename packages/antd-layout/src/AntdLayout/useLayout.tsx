import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { MenuProps } from 'antd';
import { CurrentUser } from '../interface';

export interface LayoutProviderProps {
  theme: 'light' | 'dark';
  topMenu?: boolean;
  logo?: string;
  title?: string;
  onLogoClick?: () => void;
  siderWidth?: number;
  onMenuClick?: MenuProps['onClick'];
  accordion?: boolean; // Sider Menu 是否是手风琴模式
  helpHref?: string;
  currentUser?: CurrentUser;
  onLogout?: () => void;
}

const useValues = (props: LayoutProviderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return {
    ...props,
    collapsed,
    onCollapse: (collapsed: boolean) => setCollapsed(collapsed),
  };
};

const LayoutContext = createContext<ReturnType<typeof useValues>>(null!);

export const LayoutProvider: FC<PropsWithChildren<LayoutProviderProps>> = ({ children, ...restProps }) => {
  return <LayoutContext.Provider value={useValues(restProps)}>{children}</LayoutContext.Provider>;
};

export const useLayout = () => {
  const values = useContext(LayoutContext);
  if (values === null) {
    throw 'useLayout should be placed under LayoutProvider';
  }
  return values;
};
