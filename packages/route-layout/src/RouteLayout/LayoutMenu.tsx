import { FC, memo } from 'react';
import { MenuProps } from 'antd';
import { BaseMenu } from '@repo/ui';
import { useRoute } from '../RouteProvider';
import { useLayout } from './useLayout';

export interface LayoutMenuProps extends Pick<MenuProps, 'mode'> {
  className?: string;
}

const LayoutMenu: FC<LayoutMenuProps> = ({ mode, className }) => {
  const { theme, onMenuClick, accordion } = useLayout();
  const { pathname, menuItems } = useRoute();

  return (
    <div className={className}>
      <BaseMenu
        mode={mode ?? 'inline'}
        theme={theme}
        menuItems={menuItems}
        onClick={onMenuClick}
        pathname={pathname}
        accordion={accordion}
      />
    </div>
  );
};

export default memo(LayoutMenu);
