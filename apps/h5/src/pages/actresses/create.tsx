import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { Toast } from 'antd-mobile';
import { SubmitActressDTO } from '@repo/service';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function CreateActressPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: SubmitActressDTO) => services.actress.create(values),
    onSuccess: () => {
      Toast.show({ icon: 'success', content: '创建成功' });
      navigate('/actresses');
    },
    onError: () => {
      Toast.show({ icon: 'fail', content: '创建失败' });
    },
  });

  return (
    <PageHeaderWrapper title="创建演员" onBack={() => navigate('/actresses')}>
      <ActressForm onSubmit={mutation.mutate} submitting={mutation.isPending} />
    </PageHeaderWrapper>
  );
}
