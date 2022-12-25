import { attach, createEvent, restore, sample } from "effector";
import { StaticPageContext } from "nextjs-effector";
import { debug } from "patronum/debug";
import { moviesApi } from "shared/api";

export const pageStarted = createEvent();

const getMovieByIdFx = attach({ effect: moviesApi.getById });
export const $movie = restore(getMovieByIdFx, null);

sample({
  clock: pageStarted,
  fn: (context: StaticPageContext | void) => context?.params?.id,
  target: getMovieByIdFx,
});


debug(pageStarted);
