import { createEvent, createStore } from "effector";
import { createToggler } from "shared/lib/toggler";

export const searchInstance = createToggler();

export const setInputValue = createEvent<string>();
export const $inputValue = createStore("").on(setInputValue, (_, payload) => payload);
