import { useNavigate, useParams } from 'react-router';
import { css } from '@emotion/css';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Dialog, Result, Toast } from 'antd-mobile';
import { SubmitActressDTO } from '@repo/service';
import Loading from '@/components/Loading';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { services } from '@/services';
import ActressForm from './ActressForm';

export default function EditActressPage() {
  const { actress_id } = useParams();
  const navigate = useNavigate();

  const { data: actress } = useQuery({
    queryKey: [`/actresses/${actress_id}`],
    queryFn: () => services.actress.getById(Number(actress_id)),
  });

  const back = () => navigate('/actresses');

  const updateMutation = useMutation({
    mutationFn: (values: SubmitActressDTO) => services.actress.update(Number(actress_id), values),
    onSuccess: () => {
      Toast.show({ icon: 'success', content: '更新成功' });
      back();
    },
    onError: () => {
      Toast.show({ icon: 'fail', content: '更新失败' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: services.actress.delete,
    onSuccess: () => {
      Toast.show({ icon: 'success', content: '删除成功', position: 'bottom' });
      back();
    },
    onError: () => {
      Toast.show({ icon: 'fail', content: '删除失败', position: 'bottom' });
    },
  });

  const right = actress && (
    <Button
      fill="outline"
      size="small"
      color="danger"
      onClick={() => {
        Dialog.confirm({
          content: '确认删除',
          onConfirm: async () => deleteMutation.mutateAsync(Number(actress_id)),
          confirmText: <span style={{ color: '#ff4a58' }}>删除</span>,
        });
      }}
    >
      删除
    </Button>
  );

  const content = actress ? (
    <ActressForm
      key={actress_id}
      actress={actress}
      onSubmit={updateMutation.mutate}
      submitting={updateMutation.isPending}
    />
  ) : (
    <Result status="info" title="资源不存在" description="您要编辑的演员不存在" />
  );

  return (
    <PageHeaderWrapper title="编辑演员" onBack={back} right={right}>
      {actress ? (
        content
      ) : (
        <div
          className={css`
            display: flex;
            padding-top: 5rem;
          `}
        >
          <Loading content="内容加载中" />
        </div>
      )}
    </PageHeaderWrapper>
  );
}
