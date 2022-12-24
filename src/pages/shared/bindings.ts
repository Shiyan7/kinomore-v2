import { createGSPFactory, createGSSPFactory } from "nextjs-effector";
import { appModel } from "pages/shared";

export const createGSP = createGSPFactory({
  sharedEvents: [appModel.appStarted],
});

export const createGSSP = createGSSPFactory({
  sharedEvents: [appModel.appStarted],
});
