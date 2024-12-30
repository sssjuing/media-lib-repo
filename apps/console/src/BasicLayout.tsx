import { FC, PropsWithChildren, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AntdLayout, useAuth, usePageTitle } from '@repo/antd-layout';
import logo from '@/assets/logo.svg';
import getRouteData from './utils/getRouteData';
import routes from './routes';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const { Authorize, Forbidden } = useAuth();
  const pageTitle = usePageTitle();

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Authorize noMatch={<Forbidden />}>{children}</Authorize>
    </>
  );
};

const BasicLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const routeData = useMemo(() => getRouteData(routes), [routes]);

  return (
    <AntdLayout
      rootPath="/"
      theme="dark"
      logo={logo}
      siderWidth={230}
      title="媒体库"
      pathname={pathname}
      routeData={routeData}
      onMenuClick={({ key }) => navigate(key)}
      onLogoClick={() => navigate('/')}
      currentUser={{
        id: 12,
        name: 'Serati Ma',
        auth: [
          //
          'admin',
          'user',
        ],
      }}
      // accordion
    >
      <Wrapper>
        <Outlet />
      </Wrapper>
    </AntdLayout>
  );
};

export default BasicLayout;
