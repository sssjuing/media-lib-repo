import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ActressCard from '@/components/ActressCard';
import { services } from '@/services';

export default function () {
  const { actress_id } = useParams();
  const navigate = useNavigate();
  const { data: actress } = useSWR(`/actresses/${actress_id}`, () =>
    services.actress.getById(Number(actress_id)),
  );

  return (
    <PageHeaderWrapper
      title={`${actress?.unique_name}的详情`}
      onBack={() => navigate('/actresses')}
    >
      {actress && <ActressCard actress={actress} />}
    </PageHeaderWrapper>
  );
}
