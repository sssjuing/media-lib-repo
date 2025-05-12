import { FC } from 'react';
import { Route, Routes } from 'react-router';
import NotFound from '@/pages/404';
import ContentPage from './content';
import CreatePage from './create';
import EditPage from './edit';
import Index from './index';
import VideosPage from './videos';

const ActressesLayout: FC = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="create" element={<CreatePage />} />
      <Route path=":actress_id/content" element={<ContentPage />} />
      <Route path=":actress_id/edit" element={<EditPage />} />
      <Route path=":actress_id/videos" element={<VideosPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ActressesLayout;
