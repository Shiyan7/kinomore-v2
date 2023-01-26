import axios from 'axios';
import { getCookie, hasCookie, setCookie, deleteCookie } from 'cookies-next';
import { createEffect, createStore, sample, attach } from 'effector';
import { internalApi, instance, type User } from 'shared/api/internal';
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

  const $user = createStore<User | null>(null)
    .on([loginFx.doneData, registerFx.doneData, refreshFx.doneData], (_, payload) => payload.user)
    .reset(removeAccessTokenFx.done);

  const $isAuth = $user.map((user) => !!user);

  const $hasToken = createStore(Boolean(getAccessToken()))
    .on(setAccessTokenFx.done, () => true)
    .on(removeAccessTokenFx.done, () => false);

  const $isLoading = createStore(false).on([loginFx.pending, registerFx.pending], (_, payload) => payload);

  sample({
    clock: [loginFx.doneData, registerFx.doneData, refreshFx.doneData],
    fn: ({ accessToken }) => accessToken,
    target: setAccessTokenFx,
  });

  sample({
    clock: logoutFx.doneData,
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
    $user,
    $isAuth,
    $hasToken,
    $isLoading,
    login: loginFx,
    logout: logoutFx,
    refresh: refreshFx,
    register: registerFx,
  };
}
