import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { describe, expect, test } from 'vitest';
import { videos } from './test_data';
import { VideoService } from './video';

const mock = new AxiosMockAdapter(axios);
mock.onGet('/api/videos').reply(200, videos);
mock.onGet('api/videos/229').reply(200, videos[1]);

const vs = new VideoService(
  axios.create({
    baseURL: '/api',
  }),
);

describe('VideoService', () => {
  describe('list', () => {
    test('200', async () => {
      const data = await vs.list({ tags: ['OL'] });
      expect(data.length).toBe(2);
    });
  });

  describe('create', () => {
    test.skip('201', async () => {
      const data = await vs.create({ serial_number: Math.random().toString(), cover_path: '223', mosaic: false });
      console.log(data);
    });
  });

  describe('getById', () => {
    test('200', async () => {
      const data = await vs.getById(229);
      expect(data?.id).toBe(229);
    });
  });

  describe('update', () => {
    test.skip('200', async () => {
      const data = await vs.update(8, { serial_number: '6666' });
      console.log(data);
    });
  });

  describe('delete', () => {
    test.skip('204', async () => {
      const data = await vs.delete(229);
      console.log(data);
    });
  });
});
