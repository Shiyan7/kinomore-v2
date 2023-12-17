import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps, AppType } from 'next/app';

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';

export const withGoogleOAuth = (Component: AppType) => (props: AppProps) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Component {...props} />
    </GoogleOAuthProvider>
  );
};
