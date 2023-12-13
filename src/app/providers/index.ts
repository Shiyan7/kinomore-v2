import compose from 'compose-function';
import { withGoogleOAuth } from './with-google-oauth';
import { withSeo } from './with-seo';

export const withProviders = compose(withSeo, withGoogleOAuth);
