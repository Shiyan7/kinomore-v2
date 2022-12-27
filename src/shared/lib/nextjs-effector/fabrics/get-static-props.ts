/* eslint-disable */
import { allSettled, fork, Scope, serialize } from "effector";
import { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { INITIAL_STATE_KEY } from "../constants";
import { ContextNormalizers } from "../context-normalizers";
import { isStaticPageEvent } from "../shared";
import { AnyProps, EmptyOrStaticPageEvent } from "../types";

export interface CreateAppGSPConfig {
  sharedEvents?: EmptyOrStaticPageEvent<any, any>[];
  createServerScope?: (context: GetStaticPropsContext) => Scope;
}

export interface CustomizeGSPParams<Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData> {
  scope: Scope;
  context: GetStaticPropsContext<Q, D>;
}

export type CustomizeGSP<
  P extends AnyProps = AnyProps,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (params: CustomizeGSPParams<Q, D>) => GetStaticPropsResult<P> | Promise<GetStaticPropsResult<P>>;

export interface CreateGSPConfig<P extends AnyProps, Q extends ParsedUrlQuery, D extends PreviewData> {
  pageEvent?: EmptyOrStaticPageEvent<Q, D>;
  customize?: CustomizeGSP<P, Q, D>;
}

export function createGSPFactory({ sharedEvents = [], createServerScope = () => fork() }: CreateAppGSPConfig = {}) {
  return function createGSP<
    P extends AnyProps = AnyProps,
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  >({ pageEvent, customize }: CreateGSPConfig<P, Q, D> = {}): GetStaticProps<P, Q, D> {
    return async function getStaticProps(context) {
      /*
       * In GSP, always run both "sharedEvents" and "pageEvent"
       */
      const events = [...sharedEvents, pageEvent].filter(isStaticPageEvent);

      const normalizedContext = ContextNormalizers.getStaticProps(context);

      const scope = createServerScope(context);

      for (const event of events) {
        await allSettled(event, { scope, params: normalizedContext });
      }

      /*
       * Get user's GSP result
       * Fallback to empty props object if no custom GSP used
       */
      const gspResult = customize ? await customize({ scope, context }) : { props: {} as P };

      const hasProps = "props" in gspResult;

      /*
       * Pass 404 and redirects as they are
       */
      if (!hasProps) {
        return gspResult;
      }

      /*
       * Serialize after customize to include user operations
       */
      const effectorProps = {
        [INITIAL_STATE_KEY]: serialize(scope),
      };

      /*
       * Mix serialized Effector Scope values into the user props
       */
      gspResult.props = { ...gspResult.props, ...effectorProps };

      return gspResult;
    };
  };
}
