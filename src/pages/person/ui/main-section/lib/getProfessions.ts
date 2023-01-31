import type { Profession } from 'shared/api';

export function getProfessions(professions: Profession[]) {
  return Object.values(professions)
    .map((item) => item.value)
    .join(', ');
}
