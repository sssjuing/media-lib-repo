import { AxiosInstance } from 'axios';
import { ActressService } from './services/actress';
import { VideoService } from './services/video';

export class Services {
  public video: VideoService;
  public actress: ActressService;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    this.video = new VideoService(axiosInstance);
    this.actress = new ActressService(axiosInstance);
  }
}

export * from './dtos';
export * from './interfaces';
export * from './utils';
