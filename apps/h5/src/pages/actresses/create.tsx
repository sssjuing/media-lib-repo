import { useNavigate } from 'react-router';
import { Toast } from 'antd-mobile';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function CreateActressPage() {
  const navigate = useNavigate();

  return (
    <PageHeaderWrapper title="创建演员" onBack={() => navigate('/actresses')}>
      <ActressForm
        onSubmit={async (a) => {
          const res = await services.actress.create(a);
          if (res) {
            Toast.show({ icon: 'success', content: '创建成功' });
            navigate('/actresses');
          } else {
            Toast.show({ icon: 'fail', content: '创建失败' });
          }
        }}
      />
    </PageHeaderWrapper>
  );
}
