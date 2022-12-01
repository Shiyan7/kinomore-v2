import { createEvent, createStore } from "effector";

export const showSearchWindow = createEvent();

export const $searchStore = createStore<boolean>(false);

$searchStore.on(showSearchWindow, (prev) => !prev);
