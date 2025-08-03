import { createFileRoute } from '@tanstack/react-router';
import { Button, Card } from 'antd';
import NiceModal from '@ebay/nice-modal-react';
import { GridContent } from '@repo/antd-layout';
import { UploadTemplateModal } from '@/components/upload-template-modal';

export const Route = createFileRoute('/resource/product-capacity')({
  staticData: { name: '产能表', weight: 2 },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GridContent>
      <Card>
        <Button onClick={() => NiceModal.show(UploadTemplateModal, { title: '产能模板导入' })}>模板导入</Button>
      </Card>
    </GridContent>
  );
}
