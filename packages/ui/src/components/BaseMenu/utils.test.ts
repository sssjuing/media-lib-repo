import { test, expect } from 'vitest';
import { MenuItem } from '../../interface';
import { isMainMenu, getFlatMenuKeys, getInitOpenKeys, getMenuMatches } from './utils';

test('测试 isMainMenu', () => {
  const menuItems: MenuItem[] = [
    {
      key: 'sub2',
      label: 'Navigation Two',
      children: [{ key: 'sub3', label: 'Submenu' }],
    },
  ];
  expect(isMainMenu(menuItems, 'sub2')).toBe(true);
  expect(isMainMenu(menuItems, 'sub3')).toBe(false);
});

// TODO: 似乎可以用 pathRouteMap 简化掉
test('测试 getFlatMenuKeys', () => {
  expect(
    getFlatMenuKeys([
      {
        key: '/sub1',
        label: 'Navigation One',
        children: [
          { key: '/sub1/5', label: 'Option 5' },
          { key: '/sub1/6', label: 'Option 6' },
        ],
      },
    ]),
  ).toEqual(['/sub1', '/sub1/5', '/sub1/6']);
});

test('测试 getInitOpenKeys', () => {
  expect(getInitOpenKeys(['/a', '/a/b', '/a/c', '/a/b/c', '/a/b/d'], '/a/b/c')).toEqual(['/a', '/a/b', '/a/b/c']);
});

test('测试 getMenuMatches', () => {
  expect(getMenuMatches(['/dashboard', '/dashboard/analysis', '/dashboard/monitor'], '/dashboard/analysis')).toEqual([
    '/dashboard/analysis',
  ]);
  expect(getMenuMatches(['/dashboard', '/dashboard/analysis', '/dashboard/monitor'], '/dashboard/')).toEqual([
    '/dashboard',
  ]);
  expect(getMenuMatches(['/dashboard/:id', '/dashboard/analysis'], '/dashboard/12')).toEqual(['/dashboard/:id']);
});
