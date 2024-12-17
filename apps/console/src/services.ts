import { Services } from '@repo/service';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

export const services = new Services({ axiosInstance });
