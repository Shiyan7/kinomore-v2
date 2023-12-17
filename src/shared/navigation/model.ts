import type { ParsedUrlQuery } from 'node:querystring';
import { attach, createEvent, createStore, sample } from 'effector';
import { createGate } from 'effector-react';
import type { NextRouter } from 'next/router';
import { atom } from 'shared/factory';
import { reshape } from 'patronum';

export const navigationModel = atom(() => {
  const RouterGate = createGate<{ router: NextRouter }>();

  const $router = createStore<NextRouter | null>(null, {
    serialize: 'ignore',
  })
    .on(RouterGate.state, (_, { router }) => router)
    .reset(RouterGate.close);

  const { $query, $asPath } = reshape({
    source: $router,
    shape: {
      $query: (router) => router?.query,
      $asPath: (router) => router?.asPath,
    },
  });

  const pushFx = attach({
    source: $router,
    effect: (router, url: string) => router?.push(url),
  });

  const pushQueryFx = attach({
    source: $router,
    effect: (router, query: ParsedUrlQuery | null) => {
      if (router) {
        const { page, ...routerQuery } = router.query;

        router?.push({ query: { ...routerQuery, ...query } });
      }
    },
  });

  return {
    RouterGate,
    $router,
    $query,
    pushFx,
    pushQueryFx,
    $asPath,
  };
});
