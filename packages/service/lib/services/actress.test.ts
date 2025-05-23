import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { describe, expect, test } from 'vitest';
import { ActressService } from './actress';
import { actresses, videos } from './test_data';

const mock = new AxiosMockAdapter(axios);
mock.onGet('/api/actresses').reply(200, actresses);
mock.onGet('api/actresses/74').reply(200, actresses[0]);
mock.onGet('api/actresses/74/videos').reply(200, videos);

const as = new ActressService(
  axios.create({
    baseURL: '/api',
  }),
);

describe('ActressService', () => {
  describe('list', () => {
    test('200', async () => {
      const data = await as.list();
      expect(data.length).toBe(2);
    });
  });

  describe('create', () => {
    test.skip('201', async () => {
      const data = await as.create({
        unique_name: Math.random().toString(),
        chinese_name: Math.random().toString(),
      });
      console.log(data);
    });
  });

  describe('getById', () => {
    test('200', async () => {
      const data = await as.getById(74);
      expect(data?.id).toBe(74);
    });
  });

  describe('update', () => {
    test.skip('测试 actress update', async () => {
      const data = await as.update(1, { unique_name: '12', chinese_name: '223' });
      console.log(data);
    });
  });

  describe('delete', () => {
    test.skip('测试 actress delete', async () => {
      const data = await as.delete(3);
      console.log(data);
    });
  });

  describe('listVideos', () => {
    test('测试 actress listVideo', async () => {
      const data = await as.listVideos(74);
      expect(data.length).toBe(2);
    });
  });
});
