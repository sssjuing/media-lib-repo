import { AxiosInstance } from 'axios';
import { VideoTag } from '../interfaces';

export class VideoTagService {
  #axios: AxiosInstance;

  constructor(a: AxiosInstance) {
    this.#axios = a;
  }

  list = async () => {
    const { data } = await this.#axios.get<VideoTag[]>('/video-tags');
    return data;
  };

  create = async (tag: Pick<VideoTag, 'name' | 'rank'>) => {
    const { data } = await this.#axios.post<VideoTag>('/video-tags', tag);
    return data;
  };

  update = async (tag: VideoTag) => {
    const { data } = await this.#axios.put<VideoTag>(`/video-tags/${tag.id}`, tag);
    return data;
  };

  delete = async (tagId: number) => {
    const { data } = await this.#axios.delete<VideoTag>(`/video-tags/${tagId}`);
    return data;
  };
}
