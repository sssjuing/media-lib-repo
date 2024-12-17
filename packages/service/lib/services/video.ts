import { AxiosInstance } from 'axios';
import { SubmitVideoDTO, VideoDTO } from '../dtos';
import { Video } from '../interfaces';
import { ActressService } from './actress';

export class VideoService {
  #axios: AxiosInstance;

  constructor(a: AxiosInstance) {
    this.#axios = a;
  }

  static converter(dto: VideoDTO): Video {
    return {
      id: dto.id,
      serial_number: dto.serial_number,
      cover_path: dto.cover_path,
      title: dto.title ?? undefined,
      chinese_title: dto.chinese_title ?? undefined,
      actresses: dto.actresses?.map(ActressService.converter),
      release_date: dto.release_date ?? undefined,
      bucket_path: dto.bucket_path ?? undefined,
      mosaic: dto.mosaic ?? undefined,
      tags: dto.tags ?? undefined,
      synopsis: dto.synopsis ?? undefined,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
  }

  list = async () => {
    try {
      const { data } = await this.#axios.get<VideoDTO[]>('/videos');
      return data.map(VideoService.converter);
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  create = async (dto: SubmitVideoDTO) => {
    try {
      const { data } = await this.#axios.post<VideoDTO>('/videos', dto);
      return VideoService.converter(data);
    } catch (e) {
      console.error(e);
    }
  };

  getById = async (videoId: number) => {
    try {
      const { data } = await this.#axios.get<VideoDTO>(`/videos/${videoId}`);
      return VideoService.converter(data);
    } catch (e) {
      console.error(e);
    }
  };

  update = async (videoId: number, dto: Partial<SubmitVideoDTO>) => {
    try {
      const { data } = await this.#axios.put<VideoDTO>(`/videos/${videoId}`, dto);
      return VideoService.converter(data);
    } catch (e) {
      console.error(e);
    }
  };

  delete = async (videoId: number) => {
    try {
      await this.#axios.delete(`/videos/${videoId}`);
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
}
