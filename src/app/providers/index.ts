import compose from 'compose-function';
import { withEffectorProvider } from './with-effector';
import { withSeo } from './with-seo';

export const withProviders = compose(withEffectorProvider, withSeo);
