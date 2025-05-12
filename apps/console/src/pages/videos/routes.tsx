import { RouteObject } from 'react-router';
import { WithMeta } from '@repo/antd-layout';
import CreateVideoPage from './create';
import EditVideoPage from './edit';
import VideosIndexPage from './index';

const routes: WithMeta<RouteObject>[] = [
  { index: true, element: <VideosIndexPage /> },
  { path: 'create', metadata: { name: '创建视频' }, element: <CreateVideoPage /> },
  { path: ':video_id/edit', metadata: { name: '编辑视频' }, element: <EditVideoPage /> },
];

export default routes;
