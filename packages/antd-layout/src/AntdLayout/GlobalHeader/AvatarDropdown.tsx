import { FC, memo } from 'react';
import { css, cx } from '@emotion/css';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useLayout } from '../useLayout';

export interface AvatarDropdownProps {
  className?: string;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ className }) => {
  const { currentUser, onLogout } = useLayout();

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      onLogout?.();
    } else {
      // history?.push(`/account/${key}`);
    }
  };

  return (
    <Dropdown
      menu={{
        items: [
          // { label: '用户中心', key: 'center', icon: <UserOutlined /> },
          // { label: '用户设置', key: 'settings', icon: <SettingOutlined /> },
          { label: '退出', key: 'logout', icon: <LogoutOutlined /> },
        ],
        onClick: handleMenuClick,
      }}
      placement="bottomRight"
    >
      <span
        className={cx(
          className,
          css`
            display: flex;
            align-items: center;
            > span:first-of-type {
              margin-right: 8px;
              color: var(--ant-color-primary);
              background: rgba(0, 0, 0, 0.08);
            }
            > span:last-of-type {
              font-size: 14px;
            }
          `,
        )}
      >
        {currentUser?.avatar ? (
          <Avatar size="small" src={currentUser.avatar} alt="avatar" />
        ) : (
          <Avatar size="small" icon={<UserOutlined />} alt="avatar" />
        )}
        <span>{currentUser && currentUser.name ? currentUser.name : 'User'}</span>
      </span>
    </Dropdown>
  );
};

export default memo(AvatarDropdown);
