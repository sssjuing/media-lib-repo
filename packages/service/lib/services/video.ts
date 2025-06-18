import { AxiosInstance } from 'axios';
import queryString from 'query-string';
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
      cover_url: dto.cover_url,
      title: dto.title ?? undefined,
      chinese_title: dto.chinese_title ?? undefined,
      actresses: dto.actresses?.map(ActressService.converter),
      release_date: dto.release_date ?? undefined,
      video_url: dto.video_url ?? undefined,
      mosaic: dto.mosaic ?? undefined,
      tags: dto.tags ?? undefined,
      synopsis: dto.synopsis ?? undefined,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
  }

  list = async (params: { tags?: string[] }) => {
    const { data } = await this.#axios.get<VideoDTO[]>('/videos', {
      params,
      paramsSerializer: (params) => queryString.stringify(params),
    });
    return data.map(VideoService.converter);
  };

  paginate = async (req: { tags?: string[]; page?: number; size?: number }) => {
    const { data } = await this.#axios.post<{ data: VideoDTO[]; total: number }>('/videos/paginate', req);
    return { data: data.data.map(VideoService.converter), total: data.total };
  };

  create = async (dto: SubmitVideoDTO) => {
    const { data } = await this.#axios.post<VideoDTO>('/videos', dto);
    return VideoService.converter(data);
  };

  getById = async (videoId: number) => {
    const { data } = await this.#axios.get<VideoDTO>(`/videos/${videoId}`);
    return VideoService.converter(data);
  };

  update = async (videoId: number, dto: Partial<SubmitVideoDTO>) => {
    const { data } = await this.#axios.put<VideoDTO>(`/videos/${videoId}`, dto);
    return VideoService.converter(data);
  };

  delete = async (videoId: number) => {
    await this.#axios.delete(`/videos/${videoId}`);
  };
}
