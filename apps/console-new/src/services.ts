import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { Services } from '@repo/service';

const errorHandler = ({ response, config }: AxiosError<{ errors: { body: string } }>) => {
  if (response && response.status) {
    const statusCode = response.status;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (statusCode === 401 || (response.data as any).message === 'missing or malformed jwt') {
      const encodedRedirectUri = encodeURIComponent(window.location.pathname + window.location.search);
      const urlParams = new URLSearchParams();
      urlParams.set('redirect_uri', encodedRedirectUri);
      window.location.href = `/login?${urlParams.toString()}`;
      return;
    }
    notification.error({
      message: `请求错误 ${statusCode}: ${config?.baseURL?.replace(/\/$/, '')}${config?.url}`,
      description: response.data.errors.body,
    });
    return Promise.reject(response.data);
  }
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

axiosInstance.interceptors.response.use((response) => {
  return response;
}, errorHandler);

export const services = new Services({ axiosInstance });
