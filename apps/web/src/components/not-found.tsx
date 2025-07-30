import { FC } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from 'antd';
import { Exception } from '@repo/ui';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Exception
      type={404}
      actions={
        <Button type="primary" onClick={() => navigate({ to: '/' })}>
          返回首页
        </Button>
      }
      className="mt-20"
    />
  );
};
