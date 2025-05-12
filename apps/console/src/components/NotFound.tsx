import { FC, memo } from 'react';
import { useNavigate } from 'react-router';
import { css } from '@emotion/css';
import { Button, Result } from 'antd';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={css`
        display: flex;
        min-height: 100vh;
        > div {
          margin: auto;
        }
      `}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => navigate('/')}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default memo(NotFound);
