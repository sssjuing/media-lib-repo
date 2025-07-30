import { expect, test } from 'vitest';
import z from 'zod';
import { getSubstringAfter } from './utils';

test('测试 getSubstringAfter', () => {
  expect(getSubstringAfter('//minio.net/media-lib/pictures/covers/6042a.jpg', 'media-lib/')).toBe(
    'pictures/covers/6042a.jpg',
  );
  const schema = z.number().default(10).catch(13);
  console.log(schema.parse(undefined));
  console.log(schema.parse(23));
  console.log(schema.parse('ss'));
});
