import { FC, memo } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'antd';
import { Exception } from '@repo/ui';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <Exception
      type={404}
      actions={
        <Button type="primary" onClick={() => navigate('/')}>
          Back Home
        </Button>
      }
      className="mt-20"
    />
  );
};

export default memo(NotFound);
