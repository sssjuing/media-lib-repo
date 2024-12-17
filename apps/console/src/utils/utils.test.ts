import { expect, test } from 'vitest';
import { getSubstringAfter } from './utils';

test('测试 getSubstringAfter', () => {
  expect(getSubstringAfter('//minio.net/media-lib/pictures/covers/6042a.jpg', '/media-lib/')).toBe(
    'pictures/covers/6042a.jpg',
  );
});
