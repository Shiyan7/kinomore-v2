import { createGSPFactory, createGSSPFactory } from "nextjs-effector";
import { appStarted } from "./model";

export const createGSP = createGSPFactory({
  sharedEvents: [appStarted],
});

export const createGSSP = createGSSPFactory({
  sharedEvents: [appStarted],
});
