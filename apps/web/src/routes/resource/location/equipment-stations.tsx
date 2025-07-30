import { createFileRoute } from '@tanstack/react-router';
import { Card } from 'antd';
import { GridContent } from '@repo/antd-layout';
import { SelectTable } from '@/components/select-table';

export const Route = createFileRoute('/resource/location/equipment-stations')({
  staticData: { name: '设备工位', weight: 2 },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <GridContent>
      <Card>
        <SelectTable />
      </Card>
    </GridContent>
  );
}
