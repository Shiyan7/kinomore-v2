import { createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { PageContext } from 'nextjs-effector';
import { checkFavoriteQuery } from 'features/favorites';
import { sessionModel } from 'entities/session';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';
import { movieByIdQuery } from '../api';

export const movieModel = atom(() => {
  const pageStarted = createEvent<PageContext>();

  const MoviePageGate = createGate<{ movieId: string }>();

  const trailerToggler = createToggler();

  const gradeToggler = createToggler();

  const shareToggler = createToggler();

  const playerToggler = createToggler();

  const $movie = movieByIdQuery.$data;

  const $isRated = createStore(false);

  const $rating = createStore(0);

  const ratingSelected = createEvent<{ rating: number }>();

  const ratingModalClosed = createEvent();

  sample({
    clock: ratingSelected,
    fn: ({ rating }) => rating,
    target: $rating,
  });

  sample({
    clock: ratingModalClosed,
    target: gradeToggler.close,
  });

  sample({
    clock: pageStarted,
    fn: ({ params }) => params?.id as string,
    target: movieByIdQuery.start,
  });

  sample({
    clock: sessionModel.$isRefreshed,
    source: MoviePageGate.open,
    fn: ({ movieId }) => movieId,
    target: checkFavoriteQuery.start,
  });

  $isRated.on(ratingModalClosed, () => true);

  return {
    pageStarted,
    MoviePageGate,
    trailerToggler,
    gradeToggler,
    shareToggler,
    playerToggler,
    $movie,
    $isRated,
    $rating,
    ratingModalClosed,
    ratingSelected,
  };
});
