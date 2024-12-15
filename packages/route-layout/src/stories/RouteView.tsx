import { FC, useState } from 'react';
import { css } from '@emotion/css';
import { MenuProps } from 'antd';
import { BaseMenu } from '@repo/components';
import { RouteProvider, useRoute } from '../RouteProvider';
import { usePageTitle } from '../hooks';
import { Breadcrumb } from '../components';
import { routeData } from './data';

const InnerComp: FC<Pick<MenuProps, 'onClick'>> = ({ onClick }) => {
  const { menuItems, pathname } = useRoute();
  const pageTitle = usePageTitle();

  return (
    <div
      className={css`
        border: 1px solid #ccc;
        display: flex;
        > div:first-of-type {
          flex: 0 0 300px;
        }
        > div:last-of-type {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}
    >
      <div>
        <BaseMenu theme="dark" menuItems={menuItems} onClick={onClick} pathname={pathname} />
      </div>
      <div>
        <div>
          Page Title : <strong>{pageTitle}</strong>
        </div>
        <br />
        <div>
          <Breadcrumb />
        </div>
      </div>
    </div>
  );
};

export const RouteView = () => {
  const [pathname, setPathname] = useState<string>('/sub1/g1/2');

  return (
    <RouteProvider rootPath="/" title="Platform" routeData={routeData} pathname={pathname}>
      <InnerComp onClick={({ key }) => setPathname(key)} />
    </RouteProvider>
  );
};
