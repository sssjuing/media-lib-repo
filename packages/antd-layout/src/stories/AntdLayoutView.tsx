import { FC, useState } from 'react';
import { Breadcrumb, PageHeaderWrapper, AntdLayout, AntdLayoutProps, usePageTitle } from '../main';

export type AntdLayoutViewProps = Omit<AntdLayoutProps, 'children' | 'rootPath' | 'pathname' | 'onMenuClick'>;

const InnerComp: FC<Pick<AntdLayoutProps, 'pathname'>> = ({ pathname }) => {
  const pageTitle = usePageTitle();

  return (
    <PageHeaderWrapper title={pageTitle} breadcrumb={<Breadcrumb />}>
      <div>{pathname}</div>
    </PageHeaderWrapper>
  );
};

export const AntdLayoutView: FC<AntdLayoutViewProps> = (props) => {
  const [pathname, setPathname] = useState<string>('/sub1/g1/2');

  return (
    <AntdLayout {...props} rootPath="/" pathname={pathname} onMenuClick={({ key }) => setPathname(key)}>
      <InnerComp pathname={pathname} />
    </AntdLayout>
  );
};
