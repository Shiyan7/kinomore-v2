import type { NextPage } from 'next';
import { Persons } from './persons';
import { SimilarMovies } from './similar-movies';
import { MainSection } from './main-section';

export const Movie: NextPage = () => {
  return (
    <>
      <MainSection />
      <SimilarMovies />
      <Persons />
    </>
  );
};
