import { AxiosInstance } from 'axios';
import { ActressService } from './services/actress';
import { ConfigService } from './services/configs';
import { VideoService } from './services/video';

export class Services {
  public config: ConfigService;
  public video: VideoService;
  public actress: ActressService;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.config = new ConfigService(axiosInstance);
    this.video = new VideoService(axiosInstance);
    this.actress = new ActressService(axiosInstance);
  }
}

export * from './dtos';
export * from './interfaces';
export * from './utils';
