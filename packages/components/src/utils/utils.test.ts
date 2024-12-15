import { expect, test } from 'vitest';
import { isValidUrl, urlToList } from './utils';

test('测试 isValidUrl', () => {
  expect(isValidUrl('https://domain.com?query1=a&query2=b')).toBe(true);
  expect(isValidUrl('http://www.domain.com?query1=a&query2=b')).toBe(true);
  expect(isValidUrl('http://com?query1=a&query2=b')).toBe(false);
  expect(isValidUrl('www.baidu.com')).toBe(false);
});

test('测试 urlToList', () => {
  expect(urlToList('/tasks/2144/subtasks/4323')).toEqual([
    '/tasks',
    '/tasks/2144',
    '/tasks/2144/subtasks',
    '/tasks/2144/subtasks/4323',
  ]);
});
