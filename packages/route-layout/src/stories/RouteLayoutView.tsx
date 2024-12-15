import { FC, useState } from 'react';
import { Breadcrumb, RouteLayout, RouteLayoutProps } from '../main';

export type RouteLayoutViewProps = Omit<RouteLayoutProps, 'children' | 'rootPath' | 'pathname' | 'onMenuClick'>;

export const RouteLayoutView: FC<RouteLayoutViewProps> = (props) => {
  const [pathname, setPathname] = useState<string>('/sub1/g1/2');

  return (
    <RouteLayout {...props} rootPath="/" pathname={pathname} onMenuClick={({ key }) => setPathname(key)}>
      <div>
        <Breadcrumb />
      </div>
      <div>{pathname}</div>
    </RouteLayout>
  );
};
