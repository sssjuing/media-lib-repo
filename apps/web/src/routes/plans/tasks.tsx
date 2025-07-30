import { createFileRoute } from '@tanstack/react-router';
import WujieReact from 'wujie-react';

export const Route = createFileRoute('/plans/tasks')({
  staticData: { name: '计划任务' },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>
        <WujieReact
          name="vue-app" // 子应用唯一标识
          url="http://localhost:5173/" // Vue 子应用地址
          sync={true} // 路由同步
          // props={{ userId: 123 }} // 向子应用传递 props
        />
      </div>
    </div>
  );
}
