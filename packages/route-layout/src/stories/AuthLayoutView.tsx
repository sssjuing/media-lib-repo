import { FC, useState } from 'react';
import { RouteLayout, useAuth } from '../main';
import logo from './assets/logo.svg';
import avatar from './assets/avatar.png';
import { routeData } from './data';

const AuthWrapper = ({ pathname }: { pathname: string }) => {
  const { Authorize, Forbidden } = useAuth();
  return <Authorize noMatch={<Forbidden />}>{pathname}</Authorize>;
};

export interface AuthLayoutViewProps {
  auth?: string[];
}

export const AuthLayoutView: FC<AuthLayoutViewProps> = ({ auth }) => {
  const [pathname, setPathname] = useState<string>('/sub1/g1/2');

  return (
    <RouteLayout
      rootPath="/"
      theme="dark"
      title="Platform"
      logo={logo}
      routeData={routeData}
      pathname={pathname}
      onMenuClick={({ key }) => setPathname(key)}
      currentUser={{
        id: 12,
        name: 'Serati Ma',
        avatar,
        auth,
      }}
    >
      <AuthWrapper pathname={pathname} />
    </RouteLayout>
  );
};
