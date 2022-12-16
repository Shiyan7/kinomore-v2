import { createEvent, createStore } from "effector";
import { createToggler } from "shared/lib/toggler";

export const authInstance = createToggler();

export const handleEmail = createEvent<string>();
export const $emailStore = createStore("");

$emailStore.on(handleEmail, (_, value) => value);
