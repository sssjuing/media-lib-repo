import { AxiosInstance } from 'axios';
import { ActressService } from './services/actress';
// import { ConfigService } from './services/configs';
import { VideoService } from './services/video';
import { VideoTagService } from './services/videoTag';

export class Services {
  // public config: ConfigService;
  public actress: ActressService;
  public video: VideoService;
  public videoTag: VideoTagService;

  constructor({ axiosInstance }: { axiosInstance: AxiosInstance }) {
    // this.config = new ConfigService(axiosInstance);
    this.actress = new ActressService(axiosInstance);
    this.video = new VideoService(axiosInstance);
    this.videoTag = new VideoTagService(axiosInstance);
  }
}

export * from './dtos';
export * from './interfaces';
export * from './utils';
