import { getCurrentYear } from 'shared/lib';

export function getPersonAge(age: number): number {
  return getCurrentYear() - age;
}
