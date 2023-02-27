import { MoviePerson } from 'shared/api';

export function getActors(items: MoviePerson[]) {
  const persons = items.slice(0, 3);

  return persons;
}
