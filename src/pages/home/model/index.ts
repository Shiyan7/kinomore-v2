import { attach, createEvent, restore, sample } from 'effector';
import { commonApi } from 'shared/api';
import { atom } from 'shared/lib/atom';

export const homeModel = atom(() => {
  const clientStarted = createEvent();

  const getNewMoviesFx = attach({ effect: commonApi.getNewMovies });
  const $newMovies = restore(getNewMoviesFx, null);

  const getComedyMoviesFx = attach({ effect: commonApi.getComedyMovies });
  const $comedyMovies = restore(getComedyMoviesFx, null);

  const getFamilyMoviesFx = attach({ effect: commonApi.getFamilyMovies });
  const $familyMovies = restore(getFamilyMoviesFx, null);

  const getDramaMoviesFx = attach({ effect: commonApi.getDramaMovies });
  const $dramaMovies = restore(getDramaMoviesFx, null);

  const getFantasticMoviesFx = attach({ effect: commonApi.getFantasticMovies });
  const $fantasticMovies = restore(getFantasticMoviesFx, null);

  sample({
    clock: clientStarted,
    target: [getNewMoviesFx, getComedyMoviesFx, getFamilyMoviesFx, getDramaMoviesFx, getFantasticMoviesFx],
  });

  return {
    clientStarted,
    $newMovies,
    $comedyMovies,
    $familyMovies,
    $dramaMovies,
    $fantasticMovies,
  };
});
