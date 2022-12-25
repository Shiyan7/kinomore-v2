import { IncomingMessage, ServerResponse } from 'http'
import { Event } from 'effector'
import { GetStaticPropsContext, NextPageContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'

export interface PageContextBase<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends ParsedUrlQuery = ParsedUrlQuery
> {
  route?: string
  pathname: string
  query: Q
  params: P
  asPath?: string
  locale?: string
  locales?: string[]
  defaultLocale?: string
}

export interface PageContextClientEnv {
  env: 'client'
}

export interface PageContextServerEnv {
  env: 'server'
  req: IncomingMessage & {
    cookies: {
      [key: string]: string
    }
  }
  res: ServerResponse
}

export type ClientPageContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends ParsedUrlQuery = ParsedUrlQuery
> = PageContextBase<Q, P> & PageContextClientEnv

export type ServerPageContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends ParsedUrlQuery = ParsedUrlQuery
> = PageContextBase<Q, P> & PageContextServerEnv

export type PageContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends ParsedUrlQuery = ParsedUrlQuery
> = ClientPageContext<Q, P> | ServerPageContext<Q, P>

export type PageEvent<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends ParsedUrlQuery = ParsedUrlQuery
> = Event<PageContext<Q, P>>

export type EmptyOrPageEvent<
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  P extends ParsedUrlQuery = ParsedUrlQuery
> = PageEvent<Q, P> | Event<void>

export type StaticPageContext<
  P extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = GetStaticPropsContext<P, D>

export type StaticPageEvent<
  P extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = Event<StaticPageContext<P, D>>

export type EmptyOrStaticPageEvent<
  P extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = StaticPageEvent<P, D> | Event<void>

export interface AnyProps {
  [key: string]: any
}

export type GetInitialProps<P> = (context: NextPageContext) => Promise<P>
