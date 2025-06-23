import { axiosInstance } from '@/services';
import { FileDTO } from './data';

export async function queryFiles(path?: string): Promise<FileDTO[]> {
  try {
    const { data } = await axiosInstance.get<FileDTO[]>(path ?? '');
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
