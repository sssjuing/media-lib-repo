import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FileList from './FileList';
import { queryFiles } from './service';

export default function FilesIndexPage() {
  const params = useParams();
  const path = params['*']?.replace(/\/$/, '');

  const { data = [] } = useQuery({
    queryKey: ['/files', path],
    queryFn: () => queryFiles(path ? `files/${path}` : 'files'),
  });

  return (
    <PageHeaderWrapper title="文件列表" backIcon={false}>
      <FileList data={data} />
    </PageHeaderWrapper>
  );
}
