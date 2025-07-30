import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card } from 'antd';
import { z } from 'zod';
import { GridContent } from '@repo/antd-layout';
import { useRefresh } from '@/hooks';
import { createSupplier, deleteSupplier, fetchSuppliers, updateSupplier } from '@/services/api';
import { SupplierTable } from './-supplier-table';

// https://github.com/TanStack/router/issues/4322
// const searchSchema = z.object({
//   page: z.number().default(1),
//   size: z.number().default(10),
//   // filter: fallback(z.string(), '').default(''),
//   // sort: fallback(z.enum(['newest', 'oldest', 'price']), 'newest').default('newest'),
// });

export const Route = createFileRoute('/resource/suppliers/inside')({
  staticData: { name: '内部供应商', weight: 2 },
  validateSearch: z.object({
    page: z.number().default(1).catch(1),
    size: z.number().default(10).catch(10),
  }),
  loaderDeps: ({ search: { page, size } }) => ({ page, size }),
  loader: ({ deps: { page, size } }) => fetchSuppliers({ pageNum: page, pageSize: size, type: 'inside' }),
  component: RouteComponent,
});

function RouteComponent() {
  const { page, size } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const data = Route.useLoaderData();
  const refresh = useRefresh(Route.id);

  return (
    <GridContent>
      <Card>
        <SupplierTable
          title="内部供应商列表"
          dataSource={data.data}
          pagination={{
            total: data.total,
            current: page,
            pageSize: size,
            onChange: (page, pageSize) => navigate({ search: { page, size: pageSize } }),
            showSizeChanger: true,
          }}
          onCreate={async (vals) => {
            await createSupplier({ ...vals, innerSupplier: 1 });
            navigate({ search: (prev) => ({ page: 1, size: prev.size }) });
          }}
          onUpdate={async (vals) => {
            await updateSupplier(vals);
            refresh();
          }}
          onDelete={async (vals) => {
            await deleteSupplier(vals);
            refresh();
          }}
        />
      </Card>
    </GridContent>
  );
}
