import type { PageComponent } from 'pages/shared';
import { Hero } from './hero';
import { NewFilms } from './new-films';
import { ComedyFilms } from './comedy-films';
import { ForFamily } from './for-family';
import { Genres } from './genres';
import { Drama } from './drama';
import { Info } from './info';

export const HomePage: PageComponent = () => {
  return (
    <>
      <Hero />
      <Genres />
      <ComedyFilms />
      <NewFilms />
      <ForFamily />
      <Drama />
      <Info />
    </>
  );
};
