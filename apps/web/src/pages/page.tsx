import { useNavigate } from 'react-router-dom';
import { Breadcrumb, PageHeaderWrapper, usePageTitle } from '@repo/route-layout';

export default function () {
  const navigate = useNavigate();
  const title = usePageTitle();

  return (
    <PageHeaderWrapper
      title="任务列表"
      breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}
    >
      <div>{title}</div>
    </PageHeaderWrapper>
  );
}
