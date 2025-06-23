import axios, { AxiosError } from 'axios';
import { Services } from '@repo/service';

const errorHandler = ({ response }: AxiosError<{ message: string }>) => {
  if (response && response.status) {
    const statusCode = response.status;
    if (statusCode === 401 || response.data.message === 'missing or malformed jwt') {
      const encodedRedirectUri = encodeURIComponent(window.location.pathname + window.location.search);
      const urlParams = new URLSearchParams();
      urlParams.set('redirect_uri', encodedRedirectUri);
      window.location.href = `/login?${urlParams.toString()}`;
      return;
    }
    return Promise.reject(response.data);
  }
};

export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, errorHandler);

export const services = new Services({ axiosInstance });
