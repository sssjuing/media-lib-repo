import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';
import { Button, Dialog, Result, Toast } from 'antd-mobile';
import useSWR from 'swr';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Loading from '@/components/Loading';
import { services } from '@/services';
import ActressForm from './ActressForm';

const EditActress: FC = () => {
  const { actress_id } = useParams();
  const navigate = useNavigate();
  const { data: actress } = useSWR(`/actresses/${actress_id}`, () =>
    services.actress.getById(Number(actress_id)),
  );

  const back = () => navigate('/actresses');

  const right = actress && (
    <Button
      fill="outline"
      size="small"
      color="danger"
      onClick={() => {
        Dialog.confirm({
          content: '确认删除',
          onConfirm: async () => {
            const { ok } = await services.actress.delete(Number(actress_id));
            if (ok) {
              Toast.show({
                icon: 'success',
                content: '提交成功',
                position: 'bottom',
              });
              back();
            } else {
              Toast.show({
                icon: 'fail',
                content: '提交失败',
                position: 'bottom',
              });
              throw new Error();
            }
          },
          confirmText: <span style={{ color: '#ff4a58' }}>删除</span>,
        });
      }}
    >
      删除
    </Button>
  );

  const content = actress ? (
    <ActressForm
      actress={actress}
      onSubmit={async (a) => {
        const res = await services.actress.update(Number(actress_id), a);
        if (res) {
          Toast.show({ icon: 'success', content: '提交成功' });
          back();
        } else {
          Toast.show({ icon: 'fail', content: '提交失败' });
        }
      }}
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
};

export default EditActress;
