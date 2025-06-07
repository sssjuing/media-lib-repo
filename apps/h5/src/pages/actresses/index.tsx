import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'antd-mobile';
import ActressCard from '@/components/ActressCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';

export default function ActressesPage() {
  const actressesQuery = useQuery({ queryKey: ['/actresses'], queryFn: services.actress.list });

  return (
    <PageHeaderWrapper
      title="演员列表"
      backIcon={false}
      right={
        <Link to="/actresses/create">
          <Button fill="none" size="small">
            创建
          </Button>
        </Link>
      }
    >
      {actressesQuery.data?.map((i) => <ActressCard key={i.id} actress={i} />)}
    </PageHeaderWrapper>
  );
}
