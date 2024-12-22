import dayjs from 'dayjs';

type Key = string | number;

export const sleep = async (ms: number) =>
  new Promise((res) => {
    setTimeout(() => {
      res('');
    }, ms);
  });

export function getList<T>({ byId, allIds }: { byId: { [id in Key]?: T }; allIds: Key[] }): Array<NonNullable<T>> {
  return allIds.map((id) => byId[id]).filter((item) => item) as Array<NonNullable<T>>;
}

export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(file);
  });
}

export function getAge(birthDate?: number | string | null, targetDate?: number | string) {
  return birthDate ? dayjs(targetDate).diff(birthDate, 'year') : undefined;
}

export function getAgeColor(age: number) {
  if (age > 45) return '#ff3141';
  if (age > 35) return '#ff8f1f';
  if (age > 30) return '#ffec3d';
  if (age > 24) return '#40a9ff';
  if (age > 20) return '#00b578';
  if (age >= 18) return '#f759ab';
  return '#d9d9d9';
}
