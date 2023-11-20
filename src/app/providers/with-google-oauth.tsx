import { GoogleOAuthProvider } from '@react-oauth/google';
import type { ComponentType } from 'react';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';

export const withGoogleOAuth =
  <T extends object>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Component {...props} />
      </GoogleOAuthProvider>
    );
