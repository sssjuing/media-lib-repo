import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '@repo/route-layout';

export default function () {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Breadcrumb onClick={(key) => navigate(key)} />
      </div>
    </div>
  );
}
