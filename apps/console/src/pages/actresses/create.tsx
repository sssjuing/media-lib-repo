import { useNavigate } from 'react-router';
import { Card, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function CreateActressPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: services.actress.create,
    onSuccess: () => {
      message.success('创建成功');
      navigate('/actresses');
    },
  });

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title="创建演员">
        <ActressForm onSubmit={mutation.mutate} submitting={mutation.isPending} onBack={() => navigate('/actresses')} />
      </Card>
    </PageHeaderWrapper>
  );
}
