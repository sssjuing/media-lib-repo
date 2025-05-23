import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import ActressCard from '@/components/ActressCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';

export default function ActressContentPage() {
  const { actress_id } = useParams();
  const navigate = useNavigate();

  const { data: actress } = useQuery({
    queryKey: ['/videos'],
    queryFn: () => services.actress.getById(Number(actress_id)),
  });

  return (
    <PageHeaderWrapper title={`${actress?.unique_name}的详情`} onBack={() => navigate('/actresses')}>
      {actress && <ActressCard actress={actress} />}
    </PageHeaderWrapper>
  );
}
