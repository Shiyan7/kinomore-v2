import compose from 'compose-function';
import { withEffector } from 'nextjs-effector';
import { withGoogleOAuth } from './with-google-oauth';
import { withSeo } from './with-seo';

export const withProviders = compose(withEffector, withSeo, withGoogleOAuth);
