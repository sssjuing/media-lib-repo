export function getSubstringAfter(str: string, searchFor: string) {
  const index = str.indexOf(searchFor);
  return index !== -1 ? str.substring(index + searchFor.length) : '';
}

export function getAgeColor(age: number) {
  if (age >= 45) return '#ff3141';
  if (age >= 40) return 'red';
  if (age >= 35) return 'volcano';
  if (age >= 30) return 'gold';
  if (age >= 25) return 'blue';
  if (age >= 20) return 'green';
  if (age >= 18) return 'purple';
  return '';
}
