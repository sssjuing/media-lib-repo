import axios from 'axios';
import { Services } from '@repo/service';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

export const services = new Services({ axiosInstance });
