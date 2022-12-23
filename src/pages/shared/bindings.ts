import { createGSPFactory } from "nextjs-effector";
import { appStarted } from "./model";

export const createGSP = createGSPFactory({
  sharedEvents: [appStarted],
});
