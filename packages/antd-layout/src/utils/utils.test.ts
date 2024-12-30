import { expect, test } from 'vitest';
import { urlToList } from './utils';

test('测试 urlToList', () => {
  expect(urlToList('/tasks/2144/subtasks/4323')).toEqual([
    '/tasks',
    '/tasks/2144',
    '/tasks/2144/subtasks',
    '/tasks/2144/subtasks/4323',
  ]);
});
