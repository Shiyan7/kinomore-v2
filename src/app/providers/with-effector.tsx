import type { NextComponentType } from "next";
import type { AppContext } from "next/app";
import { withEffector } from "nextjs-effector";

export const withEffectorProvider = (App: NextComponentType<AppContext>) => withEffector(App);
