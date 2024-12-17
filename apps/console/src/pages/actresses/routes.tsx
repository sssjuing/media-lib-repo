import { RouteObject } from 'react-router-dom';
import { WithMeta } from '@repo/route-layout';
import CreatePage from './create';
import EditPage from './edit';
import VideosPage from './videos';
import Index from './index';

const routes: WithMeta<RouteObject>[] = [
  { index: true, element: <Index /> },
  { path: 'create', metadata: { name: '创建演员' }, element: <CreatePage /> },
  { path: ':actress_id/edit', metadata: { name: '编辑演员' }, element: <EditPage /> },
  { path: ':actress_id/videos', metadata: { name: '演员的相关视频' }, element: <VideosPage /> },
];

export default routes;
