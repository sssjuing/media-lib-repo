import { createFileRoute } from '@tanstack/react-router';
import WujieReact from 'wujie-react';
import { Breadcrumb } from '@repo/antd-layout';

export const Route = createFileRoute('/resource/supplier/outside')({
  staticData: { name: '外部供应商' },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  return (
    <div>
      <Breadcrumb onClick={(key) => navigate({ to: key })} />
      Hello /resource/supplier/outside!
      <div style={{ width: '100%', height: '600px' }}>
        <WujieReact
          name="vue-app" // 子应用唯一标识
          url="http://localhost:5173/" // Vue 子应用地址
          sync={true} // 路由同步
          props={{ userId: 123 }} // 向子应用传递 props
        />
      </div>
    </div>
  );
}
