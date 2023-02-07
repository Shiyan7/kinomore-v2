import { getCurrentYear } from 'shared/lib';

export function getPersonAge(age: number): string {
  return String(getCurrentYear() - age);
}
