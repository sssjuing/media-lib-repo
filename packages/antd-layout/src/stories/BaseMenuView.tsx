import { FC, useState } from 'react';
import { css } from '@emotion/css';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { BaseMenu, BaseMenuProps } from '../components/BaseMenu';

const menuItems = [
  {
    key: '/sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: '/sub1/g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '/sub1/g1/1', label: 'Option 1' },
          { key: '/sub1/g1/2', label: 'Option 2' },
        ],
      },
      {
        key: '/sub1/g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '/sub1/g2/3', label: 'Option 3' },
          { key: '/sub1/g2/4', label: 'Option 4' },
        ],
      },
    ],
  },
  {
    key: '/sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '/sub2/5', label: 'Option 5' },
      { key: '/sub2/6', label: 'Option 6' },
      {
        key: '/sub2/sub3',
        label: 'Submenu',
        children: [
          { key: '/sub2/sub3/7', label: 'Option 7' },
          { key: '/sub2/sub3/8', label: 'Option 8' },
        ],
      },
    ],
  },
];

export type BaseMenuViewProps = Pick<BaseMenuProps, 'theme' | 'mode' | 'accordion'>;

export const BaseMenuView: FC<BaseMenuViewProps> = (props) => {
  const [pathname, setPathname] = useState<string>('/sub1/g1/2');

  return (
    <div
      className={css`
        display: flex;
        > div:first-of-type {
          flex: 0 0 350px;
        }
      `}
    >
      <div>
        <BaseMenu
          {...props}
          //
          menuItems={menuItems}
          pathname={pathname}
          onClick={({ key }) => setPathname(key)}
        />
      </div>
      {/* <div>{pathname}</div> */}
    </div>
  );
};
