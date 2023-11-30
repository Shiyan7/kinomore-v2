import { createEffect, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { PageContext } from 'nextjs-effector';
import { checkFavoriteQuery } from 'features/favorites';
import { sessionModel } from 'entities/session';
import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';
import { notificationModel } from 'entities/notification';
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

  const linkCopied = createEvent<{ url: string }>();

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

  const linkCopiedSuccessFx = createEffect(() => {
    notificationModel.show({
      message: 'Скопировано!',
      description: 'Ссылка скопирована в буфер обмена',
      type: 'info',
    });
  });

  const copyUrlFx = createEffect((url: string) => {
    if (!navigator?.clipboard) {
      return false;
    }

    try {
      navigator.clipboard.writeText(url);
    } catch (error) {
      throw new Error();
    }
  });

  sample({
    clock: linkCopied,
    fn: ({ url }) => url,
    target: copyUrlFx,
  });

  sample({
    clock: copyUrlFx.done,
    target: [shareToggler.close, linkCopiedSuccessFx],
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
    linkCopied,
  };
});
