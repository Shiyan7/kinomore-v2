import { createEvent } from 'effector';
import { PageContext } from 'nextjs-effector';

export const appStarted = createEvent<PageContext>();
