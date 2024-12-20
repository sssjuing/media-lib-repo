export function isValidUrl(str: string): boolean {
  const pattern = new RegExp(
    '^https?:\\/\\/' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(str);
}

/**
 * 将传入的 url 路径分解为从顶层到底层的 url 路径列表. 实例:
 * '/userinfo/2144/id' => ['/userinfo','/userinfo/2144','/userinfo/2144/id']
 * @param url: 传入的待分解的 url 路径
 */
export function urlToList(url: string): string[] {
  if (url === '/') return ['/'];
  const urlList = url.split('/').filter((i) => i); // 去除空字符，即去除路径中有两个连续斜杠的元素
  return urlList.map((_, index) => `/${urlList.slice(0, index + 1).join('/')}`);
}
