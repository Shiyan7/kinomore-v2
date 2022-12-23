import { attach, createEvent, restore, sample } from "effector";
import { ClientPageContext } from "nextjs-effector";
import { moviesApi } from "shared/api";

export const pageStarted = createEvent();

const getMovieByIdFx = attach({ effect: moviesApi.getById });
export const $movie = restore(getMovieByIdFx, null);

sample({
  clock: pageStarted,
  fn: (context: ClientPageContext | void) => context?.params?.id,
  target: getMovieByIdFx,
});
