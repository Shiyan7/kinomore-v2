import { createEvent, createStore, sample } from 'effector';
import { isServerPageContext } from 'nextjs-effector';

export const appStarted = createEvent();
