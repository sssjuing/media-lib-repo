export function getSubstringAfter(str: string, searchFor: string) {
  const index = str.indexOf(searchFor);
  return index !== -1 ? str.substring(index + searchFor.length) : '';
}
