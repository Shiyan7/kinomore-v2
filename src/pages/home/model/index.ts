import { sample } from 'effector';
import { createGate } from 'effector-react';
import { atom } from 'shared/factory';
import { comedyMoviesQuery, dramaMoviesQuery, familyMoviesQuery, fantasticMoviesQuery, newMoviesQuery } from '../api';

export const homeModel = atom(() => {
  const HomePageGate = createGate();

  const $newMovies = newMoviesQuery.$data;

  const $comedyMovies = comedyMoviesQuery.$data;

  const $familyMovies = familyMoviesQuery.$data;

  const $dramaMovies = dramaMoviesQuery.$data;

  const $fantasticMovies = fantasticMoviesQuery.$data;

  sample({
    clock: HomePageGate.open,
    target: [
      newMoviesQuery.start,
      comedyMoviesQuery.start,
      familyMoviesQuery.start,
      dramaMoviesQuery.start,
      fantasticMoviesQuery.start,
    ],
  });

  return {
    HomePageGate,
    $newMovies,
    $comedyMovies,
    $familyMovies,
    $dramaMovies,
    $fantasticMovies,
  };
});
