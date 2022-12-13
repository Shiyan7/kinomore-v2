import { createGIPFactory, createGSPFactory } from "nextjs-effector";
import { appStarted } from "./model";

export const createGIP = createGIPFactory({
  sharedEvents: [appStarted],
});

export const createGSP = createGSPFactory();
