import { AxiosInstance } from 'axios';
import { VideoService } from './services/video';
import { ActressService } from './services/actress';

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
