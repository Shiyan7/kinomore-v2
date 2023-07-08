import type { NextComponentType } from 'next';
import { withEffector } from 'nextjs-effector';
import type { AppContext } from 'next/app';

export const withEffectorProvider = (App: NextComponentType<AppContext>) => withEffector(App);
