import compose from 'compose-function';
import { withEffector } from 'nextjs-effector';
import { withSeo } from './with-seo';

export const withProviders = compose(withEffector, withSeo);
