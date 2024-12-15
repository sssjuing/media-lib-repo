import { pathToRegexp } from 'path-to-regexp';
import { urlToList } from '../utils/utils';
import { MenuItem } from '../interface';

export function isMainMenu(items: MenuItem[], key: string): boolean {
  return items.some((item) => {
    if (key) {
      return item!.key === key;
    }
    return false;
  });
}

export function getFlatMenuKeys(items: MenuItem[]): string[] {
  let keys: string[] = [];
  items.forEach((item) => {
    keys.push(item.key);
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children));
    }
  });
  return keys;
}

export function getInitOpenKeys(flatMenuKeys: string[], pathname: string = ''): string[] {
  const paths = urlToList(pathname);
  const result: string[] = [];
  for (let i = 0; i < flatMenuKeys.length; i++) {
    innerLoop: for (let j = 0; j < paths.length; j++) {
      if (flatMenuKeys[i] === paths[j]) {
        result.push(paths[j]!);
        break innerLoop;
      }
    }
  }
  return result;
}

/**
 * getMenuMatchKeys 遍历 flatMenuKeys, 检测传入的 path 是否与 flatMenuKeys 中的某条路径匹配, 当 flatMenuKeys 中存在动态路由时同样有效
 * 返回值为 flatMenuKeys 中与 path 匹配的元素列表(返回类型 Array)
 * 例子:
 传入: ['/dashboard','/dashboard/analysis','/dashboard/monitor'], '/dashboard/analysis' 返回:['/dashboard/analysis']
 传入: ['/dashboard','/dashboard/analysis','/dashboard/monitor'], '/dashboard/' 返回:['/dashboard']
 传入: ['/dashboard/'], '/dashboard' 返回:[]
 传入: ['/dashboard','/dashboard/analysis','/dashboard/monitor'], '/dashboard/abc' 返回:[]
 传入: ['/dashboard/:id','/dashboard/analysis'], '/dashboard/12' 返回:['/dashboard/:id']
 传入: ['/dashboard/:id','/dashboard/analysis'], '/dashboard/analysis' 返回:['/dashboard/:id','/dashboard/analysis']
 传入: ['/dashboard/analysis','/dashboard/:id'], '/dashboard/analysis' 返回:['/dashboard/analysis','/dashboard/:id']
 */
export function getMenuMatches(flatMenuKeys: string[], path: string): string[] {
  // pathToRegexp 用于匹配静态或动态路由, 传入 /path/:id 返回正则表达式
  // test方法为 JavaScript 的正则表达式对象的内建方法, 用于检测一个字符串是否匹配某个模式
  return flatMenuKeys.filter((item) => {
    if (item) {
      return pathToRegexp(item).test(path);
    }
    return false;
  });
}

export function getSelectedKeys(menuItems: MenuItem[], pathname?: string): string[] {
  if (!pathname) {
    return [];
  }
  const flatMenuKeys = getFlatMenuKeys(menuItems);
  return urlToList(pathname)
    .map((itemPath) => getMenuMatches(flatMenuKeys, itemPath).pop())
    .filter((i) => i) as string[];
}
