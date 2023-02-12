import axios from 'axios';
import { createEffect, createStore, sample, attach, forward, createEvent } from 'effector';
import { internalApi, internalInstance, type Session, UserWithTokensDto } from 'shared/api';
import { ACCESS_TOKEN } from './config';

function getAccessToken() {
  if (typeof window !== 'undefined') return localStorage.getItem(ACCESS_TOKEN);
}

function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

const setAccessTokenFx = createEffect({ handler: setAccessToken });
const removeAccessTokenFx = createEffect({ handler: removeAccessToken });

export const loginFx = attach({ effect: internalApi.login });
export const registerFx = attach({ effect: internalApi.register });

export const logout = createEvent();

const logoutFx = attach({ effect: internalApi.logout });

forward({
  from: logout,
  to: logoutFx,
});

export const startRefresh = createEvent();

const refreshFx = attach({ effect: internalApi.refresh });

forward({
  from: startRefresh,
  to: refreshFx,
});

export const $session = createStore<Session | null>(null)
  .on([loginFx.doneData, registerFx.doneData, refreshFx.doneData], (_, payload) => payload.user)
  .reset(removeAccessTokenFx.done);

export const $isLogged = $session.map((session) => !!session);

export const $hasToken = createStore(Boolean(getAccessToken()))
  .on(setAccessTokenFx.done, () => true)
  .on(removeAccessTokenFx.done, () => false);

export const $pending = createStore(false).on(
  [loginFx.pending, registerFx.pending, logoutFx.pending],
  (_, payload) => payload
);

sample({
  clock: [loginFx.doneData, registerFx.doneData, refreshFx.doneData],
  fn: ({ accessToken }) => accessToken,
  target: setAccessTokenFx,
});

sample({
  clock: logoutFx.doneData,
  target: removeAccessTokenFx,
});

internalInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
});

internalInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && error?.config && !error?.config?._isRetry) {
      originalRequest._isRetry = true;
      try {
        const { data } = await axios.get<UserWithTokensDto>(`${process.env.INTERNAL_API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem(ACCESS_TOKEN, data.accessToken);
        originalRequest.headers = { ...originalRequest.headers };
        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
        return internalInstance.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
  }
);
