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
      uniqueName: dto.unique_name,
      chineseName: dto.chinese_name,
      englistName: dto.english_name ?? undefined,
      names: dto.names ?? undefined,
      birthDate: dto.birth_date ?? undefined,
      birthPlace: dto.birth_place ?? undefined,
      height: dto.height ?? undefined,
      weight: dto.weight ?? undefined,
      measurements: dto.measurements ?? undefined,
      cup: dto.cup ?? undefined,
      bloodGroup: dto.blood_group ?? undefined,
      debutDate: dto.debut_date ?? undefined,
      hobbies: dto.hobbies ?? undefined,
      notes: dto.notes ?? undefined,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at,
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
