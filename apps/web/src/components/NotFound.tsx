import { FC, memo } from 'react';
import { Button } from 'antd';
import { useNavigate } from '@tanstack/react-router';
import { Exception } from '@repo/ui';

const NotFound: FC = () => {
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

export default memo(NotFound);
