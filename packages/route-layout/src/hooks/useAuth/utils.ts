export function checkPermissions<T, E>(Target: T, Exception: E, routeAuth?: string[], currentAuth?: string[],): T | E {
  // 如果路由没有设置权限, 说明任何人都能访问, 直接返回 Target
  if (!routeAuth || routeAuth.length === 0) {
    return Target;
  }
  // 如果路由设置了权限, 但当前用户没有任何权限, 直接返回 Exception
  if (!currentAuth || currentAuth.length === 0) {
    return Exception;
  }
  // 当 accountAuth 和 routeAuth 都是数组且某个元素同时出现在两者之中时, 返回 Target
  if (currentAuth.some((item) => routeAuth.includes(item))) {
    return Target;
  }
  return Exception;
}

