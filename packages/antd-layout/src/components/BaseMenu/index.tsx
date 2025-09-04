import { FC, memo, useMemo, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { MenuItem } from './interface';
import { getFlatMenuKeys, getInitOpenKeys, getSelectedKeys, isMainMenu } from './utils';

export interface BaseMenuProps extends Pick<MenuProps, 'mode' | 'theme' | 'onClick' | 'className' | 'style'> {
  menuItems?: MenuItem[];
  pathname?: string;
  accordion?: boolean;
}

const BaseMenu: FC<BaseMenuProps> = (props) => {
  const { mode, theme, menuItems = [], onClick, pathname, accordion, className, style } = props;

  const [openKeys, setOpenKeys] = useState(() => {
    if (mode === 'horizontal') {
      return [];
    }
    const flatMenuKeys = getFlatMenuKeys(menuItems);
    const keys = getInitOpenKeys(flatMenuKeys, pathname);
    return keys;
  });

  const selectedKeys = useMemo(() => {
    const keys = getSelectedKeys(menuItems, pathname);
    // if (selectedMenuKeys.length === 0 && openKeys) {
    //   selectedMenuKeys = [openKeys[openKeys.length - 1]];
    // }
    // console.log(keys);
    return keys;
  }, [pathname, menuItems]);

  const handleOpenChange = (keys: string[]) => {
    if (accordion) {
      const lastOpenKey = keys[keys.length - 1];
      const moreThanOne = keys.filter((openKey) => isMainMenu(menuItems, openKey)).length > 1;
      setOpenKeys(moreThanOne ? (lastOpenKey ? [lastOpenKey] : []) : [...keys]); // 手风琴模式
    } else {
      setOpenKeys(keys);
    }
  };

  return (
    <Menu
      mode={mode ?? 'inline'}
      theme={theme}
      items={menuItems as MenuProps['items']}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onClick={onClick}
      className={className}
      style={style}
    />
  );
};

const MemoBaseMenu = memo(BaseMenu);
export { MemoBaseMenu as BaseMenu };
