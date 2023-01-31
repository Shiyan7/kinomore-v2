import type { Profession } from 'shared/api';

export function getProfessions(professions: Profession[] | undefined | null) {
  if (!professions) return '—';

  return Object.values(professions)
    .map((item) => item.value)
    .join(', ');
}
