import { useNavigate, useParams } from 'react-router';
import { Button, Card, Popconfirm, message } from 'antd';
import useSWR from 'swr';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitActressDTO } from '@repo/service';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function EditActressPage() {
  const navigate = useNavigate();
  const { actress_id } = useParams();

  const { data } = useSWR(`/actresses/${actress_id}`, () => services.actress.getById(Number(actress_id)));

  const handleSubmit = async (values: SubmitActressDTO) => {
    const a = await services.actress.update(Number(actress_id), values);
    if (a) {
      navigate('/actresses');
    }
  };

  const cardExtra = (
    <Popconfirm
      title="确认删除？"
      okText="删除"
      okButtonProps={{ danger: true, type: 'primary' }}
      cancelText="取消"
      onConfirm={async () => {
        const { ok } = await services.actress.delete(Number(actress_id));
        if (ok) {
          message.success('删除成功');
          navigate('/actresses');
        }
      }}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title="编辑演员" extra={cardExtra}>
        <ActressForm onSubmit={handleSubmit} actress={data} />
      </Card>
    </PageHeaderWrapper>
  );
}
