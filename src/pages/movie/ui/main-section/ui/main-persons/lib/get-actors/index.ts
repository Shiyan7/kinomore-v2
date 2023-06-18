import { PersonInMovie } from 'shared/api';

export function getActors(items: PersonInMovie[]) {
  const persons = items.slice(0, 3);

  return persons;
}
