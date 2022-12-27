/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-restricted-imports */
import { allSettled, fork, Scope, serialize } from "effector";
import { NextPageContext } from "next";
import { INITIAL_STATE_KEY } from "../constants";
import { ContextNormalizers } from "../context-normalizers";
import { enhancePageEvent } from "../enhanced-events";
import { env } from "../env";
import { assertStrict, isPageEvent } from "../shared";
import { state } from "../state";
import { AnyProps, EmptyOrPageEvent, GetInitialProps } from "../types";

export interface CreateAppGIPConfig {
  sharedEvents?: EmptyOrPageEvent[];
  runSharedOnce?: boolean;
  createServerScope?: (context: NextPageContext) => Scope;
}

export interface CustomizeGIPParams {
  scope: Scope;
  context: NextPageContext;
}

export type CustomizeGIP<P extends AnyProps = AnyProps> = (params: CustomizeGIPParams) => P | Promise<P>;

export interface CreateGIPConfig<P extends AnyProps> {
  pageEvent?: EmptyOrPageEvent<any, any>;
  customize?: CustomizeGIP<P>;
}

export function createGIPFactory({
  sharedEvents = [],
  runSharedOnce = true,
  createServerScope = () => fork(),
}: CreateAppGIPConfig = {}) {
  /*
   * When "runSharedOnce" is equals to "true",
   * create enhanced shared events with "runOnce"
   */
  const wrappedSharedEvents = sharedEvents.map((event) => {
    assertStrict(event);
    return enhancePageEvent(event, { runOnce: runSharedOnce });
  });

  return function createGIP<P extends AnyProps = AnyProps>({
    pageEvent,
    customize,
  }: CreateGIPConfig<P> = {}): GetInitialProps<P> {
    return async function getInitialProps(context) {
      /*
       * Determine the Effector events to run
       *
       * On server-side, use both shared and page events
       *
       * On client-side, use only page event,
       * as we don't want to run shared events again
       */
      const events = [...wrappedSharedEvents, pageEvent].filter(isPageEvent);

      const normalizedContext = ContextNormalizers.getInitialProps(context);

      // const scope = state.clientScope ?? createServerScope(context)
      /**
       * TODO: Fix needed, now we create scope on every navigation
       * Because otherwise we get in an incomprehensible freeze process waiting
       * for all events in the already existing scope
       */
      const scope = createServerScope(context);

      for (const event of events) {
        await allSettled(event, { scope, params: normalizedContext });
      }

      /*
       * On client-side, save the newly created Scope inside scopeMap
       * We need it to access on user navigation (see code above)
       */
      if (env.isClient) {
        // eslint-disable-next-line require-atomic-updates
        state.clientScope = scope;
      }

      /*
       * Get user's GIP props
       * Fallback to empty object if no custom GIP used
       */
      const userProps = customize ? await customize({ scope, context }) : ({} as P);

      /*
       * Serialize after customize to include user operations
       */
      const effectorProps = {
        [INITIAL_STATE_KEY]: serialize(scope),
      };

      return { ...userProps, ...effectorProps };
    };
  };
}
