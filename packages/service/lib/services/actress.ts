import { AxiosInstance } from 'axios';
import { ActressDTO, SubmitActressDTO, VideoDTO } from '../dtos';
import { Actress } from '../interfaces';
import { VideoService } from './video';

export class ActressService {
  #axios: AxiosInstance;

  constructor(a: AxiosInstance) {
    this.#axios = a;
  }

  static converter(dto: ActressDTO): Actress {
    return {
      id: dto.id,
      unique_name: dto.unique_name,
      chinese_name: dto.chinese_name,
      english_name: dto.english_name ?? undefined,
      names: dto.names ?? undefined,
      birth_date: dto.birth_date ?? undefined,
      birth_place: dto.birth_place ?? undefined,
      height: dto.height ?? undefined,
      weight: dto.weight ?? undefined,
      measurements: dto.measurements ?? undefined,
      cup: dto.cup ?? undefined,
      blood_group: dto.blood_group ?? undefined,
      debut_date: dto.debut_date ?? undefined,
      hobbies: dto.hobbies ?? undefined,
      notes: dto.notes ?? undefined,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
  }

  list = async () => {
    try {
      const { data } = await this.#axios.get<ActressDTO[]>('/actresses');
      return data.map(ActressService.converter);
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  create = async (dto: SubmitActressDTO) => {
    try {
      const { data } = await this.#axios.post<ActressDTO>('/actresses', dto);
      return ActressService.converter(data);
    } catch (e) {
      console.error(e);
    }
  };

  getById = async (actressId: number) => {
    try {
      const { data } = await this.#axios.get<ActressDTO>(`/actresses/${actressId}`);
      return ActressService.converter(data);
    } catch (e) {
      console.error(e);
    }
  };

  update = async (actressId: number, dto: Partial<SubmitActressDTO>) => {
    try {
      const { data } = await this.#axios.put<ActressDTO>(`/actresses/${actressId}`, dto);
      return ActressService.converter(data);
    } catch (e) {
      console.error(e);
    }
  };

  delete = async (actressId: number) => {
    try {
      await this.#axios.delete(`/actresses/${actressId}`);
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };

  listVideos = async (actressId: number) => {
    try {
      const { data } = await this.#axios.get<VideoDTO[]>(`/actresses/${actressId}/videos`);
      return data.map(VideoService.converter);
    } catch (e) {
      console.error(e);
      return [];
    }
  };
}
