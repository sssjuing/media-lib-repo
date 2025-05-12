import { RouteObject } from 'react-router';
import { WithMeta } from '@repo/antd-layout';
import CreateActressPage from './create';
import EditActressPage from './edit';
import ActressesIndexPage from './index';
import ActressVideosPage from './videos';

const routes: WithMeta<RouteObject>[] = [
  { index: true, element: <ActressesIndexPage /> },
  { path: 'create', metadata: { name: '创建演员' }, element: <CreateActressPage /> },
  { path: ':actress_id/edit', metadata: { name: '编辑演员' }, element: <EditActressPage /> },
  { path: ':actress_id/videos', metadata: { name: '演员的相关视频' }, element: <ActressVideosPage /> },
];

export default routes;
