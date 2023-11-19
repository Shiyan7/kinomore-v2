import type { Profession } from 'shared/api/types';

export function getProfessions(professions: Profession[]) {
  return professions.map((item) => item.value).join(', ');
}
