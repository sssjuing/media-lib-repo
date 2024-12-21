import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';
import useSWR from 'swr';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';
import ActressCard from './ActressCard';

export default function () {
  // const { data = [] } = useSWR('/actresses', queryActresses);
  const { data = [] } = useSWR('/actresses', services.actress.list);

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
      {data.map((i) => (
        <ActressCard key={i.id} actress={i} />
      ))}
    </PageHeaderWrapper>
  );
}
