import { AxiosInstance } from 'axios';

export class ConfigService {
  #axios: AxiosInstance;

  constructor(a: AxiosInstance) {
    this.#axios = a;
  }

  tags = async () => {
    const { data } = await this.#axios.get<string[]>('/configs/video-tags');
    return data;
  };
}
