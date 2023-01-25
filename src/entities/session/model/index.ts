import axios from 'axios';
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';
import { createEffect, createEvent, createStore, sample, attach } from 'effector';
import { internalApi, instance, type UserWithTokensDto } from 'shared/api/internal';
import { ACCESS_TOKEN } from 'shared/config';

function getAccessToken() {
  return getCookie(ACCESS_TOKEN);
}

function setAccessToken(token: string) {
  setCookie(ACCESS_TOKEN, token);
}

function removeAccessToken() {
  deleteCookie(ACCESS_TOKEN);
}

export function createSession() {
  const setAccessTokenFx = createEffect({ handler: setAccessToken });
  const removeAccessTokenFx = createEffect({ handler: removeAccessToken });

  const loginFx = attach({ effect: internalApi.login });
  const registerFx = attach({ effect: internalApi.register });
  const logoutFx = attach({ effect: internalApi.logout });
  const refreshFx = attach({ effect: internalApi.refresh });

  const logout = createEvent();
  const startRefresh = createEvent();

  const $session = createStore<UserWithTokensDto | null>(null)
    .on([loginFx.doneData, registerFx.doneData, refreshFx.doneData], (_, payload) => payload)
    .reset(removeAccessTokenFx.done);

  const $isAuth = $session.map((dto) => !!dto?.user);

  const $hasToken = createStore(Boolean(getAccessToken()))
    .on(setAccessTokenFx.done, () => true)
    .on(removeAccessTokenFx.done, () => false);

  const $sessionIsLoaded = createStore(false)
    .on($session, (_, payload) => Boolean(payload))
    .reset(logout);

  const $sessionIsLoading = createStore(false).on(
    [loginFx.pending, registerFx.pending, refreshFx.pending],
    (_, payload) => payload
  );

  sample({
    clock: startRefresh,
    target: refreshFx,
  });

  sample({
    clock: [loginFx.doneData, registerFx.doneData, refreshFx.doneData],
    filter: Boolean,
    fn: ({ accessToken }) => {
      return accessToken;
    },
    target: setAccessTokenFx,
  });

  sample({
    clock: logoutFx.doneData,
    target: logout,
  });

  sample({
    clock: logout,
    target: removeAccessTokenFx,
  });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getCookie(ACCESS_TOKEN)}`;

    return config;
  });

  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && hasCookie(ACCESS_TOKEN) && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
          const { data } = await axios.get(`${process.env.INTERNAL_API_URL}/refresh`, { withCredentials: true });

          setCookie(ACCESS_TOKEN, data?.accessToken);
          return instance.request(originalRequest);
        } catch (e) {
          console.error(e);
        }
      }
    }
  );

  return {
    $isAuth,
    $hasToken,
    $session,
    $sessionIsLoaded,
    $sessionIsLoading,
    startRefresh,
    login: loginFx,
    register: registerFx,
    logout,
  };
}

export type Session = ReturnType<typeof createSession>;
