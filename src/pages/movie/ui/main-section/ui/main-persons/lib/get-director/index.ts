import { PersonInMovie } from 'shared/api';

export function getDirector(persons: PersonInMovie[]) {
  const director = persons?.filter((person) => person.enProfession === 'director')[0];

  return [director];
}
