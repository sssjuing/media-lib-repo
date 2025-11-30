import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Button, SearchBar } from 'antd-mobile';
import ActressCard from '@/components/ActressCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';

export default function ActressesPage() {
  const [searchStr, setSearchStr] = useState('');
  const query = useQuery({ queryKey: ['/actresses'], queryFn: services.actress.list });

  const list = useMemo(() => {
    if (!searchStr) {
      return query.data;
    }
    return query.data?.filter((i) => i.unique_name.includes(searchStr) || i.chinese_name.includes(searchStr));
  }, [query.data, searchStr]);

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
      <SearchBar
        placeholder="请输入搜索内容"
        onSearch={setSearchStr}
        onClear={() => setSearchStr('')}
        className="mb-2"
      />
      {list?.map((i) => <ActressCard key={i.id} actress={i} />)}
    </PageHeaderWrapper>
  );
}
