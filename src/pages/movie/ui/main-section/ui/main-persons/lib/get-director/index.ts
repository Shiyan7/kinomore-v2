import { MoviePerson } from 'shared/api';

export function getDirector(persons: MoviePerson[]) {
  const director = persons?.filter((person) => person.enProfession === 'director')[0];

  return [director];
}
