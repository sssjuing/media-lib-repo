import { useNavigate, useParams } from 'react-router';
import { Button, Card, Popconfirm, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Breadcrumb, PageHeaderWrapper } from '@repo/antd-layout';
import { SubmitActressDTO } from '@repo/service';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function EditActressPage() {
  const navigate = useNavigate();
  const { actress_id } = useParams();

  const query = useQuery({
    queryKey: [`/actresses/${actress_id}`],
    queryFn: () => services.actress.getById(Number(actress_id)),
  });

  const updateMutation = useMutation({
    mutationFn: (values: SubmitActressDTO) => services.actress.update(Number(actress_id), values),
    onSuccess: () => {
      message.success('更新成功');
      navigate(-1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: services.actress.delete,
    onSuccess: () => {
      message.success('删除成功');
      navigate(-1);
    },
  });

  const cardExtra = (
    <Popconfirm
      placement="topRight"
      title="确认删除？"
      okText="删除"
      okButtonProps={{ danger: true, type: 'primary' }}
      cancelText="取消"
      onConfirm={() => deleteMutation.mutateAsync(Number(actress_id))}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );

  return (
    <PageHeaderWrapper breadcrumb={<Breadcrumb onClick={(key) => navigate(key)} />}>
      <Card title="编辑演员" extra={cardExtra}>
        <ActressForm
          key={actress_id}
          actress={query.data}
          onSubmit={updateMutation.mutate}
          submitting={updateMutation.isPending}
          onBack={() => navigate(-1)}
        />
      </Card>
    </PageHeaderWrapper>
  );
}
