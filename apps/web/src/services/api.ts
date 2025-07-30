import { request } from './request';

type SuppliersQueryParams = {
  pageNum: number;
  pageSize: number;
  type: 'inside' | 'outside';
};

export async function fetchSuppliers({ pageNum, pageSize, type }: SuppliersQueryParams) {
  return request<{ data: SupplierDTO[]; total: number }>({
    method: 'GET',
    url: `/dap/resource/v1/supplier/query/${pageNum}/${pageSize}/${type === 'inside' ? 1 : 0}`,
  });
}

export async function createSupplier(data: PartialPick<Omit<SupplierDTO, 'id'>, 'innerSupplier' | 'supplierName'>) {
  return request({ method: 'POST', url: '/dap/resource/v1/supplier/add', data });
}

export async function updateSupplier(data: SupplierDTO) {
  return request({ method: 'PUT', url: '/dap/resource/v1/supplier/update', data });
}

export async function deleteSupplier(data: SupplierDTO) {
  return request({ method: 'DELETE', url: `/dap/resource/v1/supplier/delete/${data.id}` });
}
