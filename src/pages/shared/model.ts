import { createEvent, sample } from "effector";
import { searchModel } from "entities/search-window";

export const appStarted = createEvent();

appStarted.watch(() => console.info("[Event] appStarted"));

sample({
  clock: appStarted,
  target: searchModel.loadSearchResults,
});
