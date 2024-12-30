import { RouteObject } from 'react-router-dom';
import { WithMeta } from '@repo/antd-layout';
import CreatePage from './create';
import EditPage from './edit';
import Index from './index';

const routes: WithMeta<RouteObject>[] = [
  { index: true, element: <Index /> },
  { path: 'create', metadata: { name: '创建视频' }, element: <CreatePage /> },
  { path: ':video_id/edit', metadata: { name: '编辑视频' }, element: <EditPage /> },
];

export default routes;
