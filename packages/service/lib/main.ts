import { AxiosInstance } from 'axios';
import { VideoService } from './services/video';
import { ActressService } from './services/actress';

export class Services {
  public video: VideoService;
  public actress: ActressService;

  constructor({ a }: { a: AxiosInstance }) {
    this.video = new VideoService(a);
    this.actress = new ActressService(a);
  }
}
