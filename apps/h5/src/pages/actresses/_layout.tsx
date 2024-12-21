import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '@/pages/404';
import CreatePage from './create';
import ContentPage from './content';
import EditPage from './edit';
import VideosPage from './videos';
import Index from './index';

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
