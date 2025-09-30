import { expect, test } from 'vitest';
import { ZodError, z } from 'zod';
import { getSubstringAfter } from './utils';

test('测试 getSubstringAfter', () => {
  expect(getSubstringAfter('//minio.net/media-lib/pictures/covers/6042a.jpg', 'media-lib/')).toBe(
    'pictures/covers/6042a.jpg',
  );
});

test('测试 zod', () => {
  try {
    z.url({ message: '请输入合法的 URL' }).parse('xx');
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.issues);
    }
  }
});
