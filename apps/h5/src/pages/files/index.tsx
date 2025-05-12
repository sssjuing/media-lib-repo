import { useParams } from 'react-router';
import useSWR from 'swr';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FileList from './FileList';
import { queryFiles } from './service';

export default function FilesIndexPage() {
  const params = useParams();
  const path = params['*']?.replace(/\/$/, '');
  const { data = [] } = useSWR(
    () => (path ? `files/${path}` : 'files'),
    (key) => queryFiles(key),
  );

  return (
    <PageHeaderWrapper title="文件列表" backIcon={false}>
      <FileList data={data} />
    </PageHeaderWrapper>
  );
}
