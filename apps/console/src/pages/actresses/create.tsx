import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { Breadcrumb, PageHeaderWrapper } from '@repo/route-layout';
import { SubmitActressDTO } from '@repo/service';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function () {
  const navigate = useNavigate();

  const handleSubmit = async (values: SubmitActressDTO) => {
    const a = await services.actress.create(values);
    if (a) {
      navigate('/actresses');
    }
  };

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title="创建演员">
        <ActressForm onSubmit={handleSubmit} />
      </Card>
    </PageHeaderWrapper>
  );
}
