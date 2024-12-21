import axios from 'axios';
import { FileDTO } from './data';

export async function queryFiles(path?: string): Promise<FileDTO[]> {
  try {
    const { data } = await axios.get<FileDTO[]>(`/api/${path}`);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}
