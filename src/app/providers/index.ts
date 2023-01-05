import compose from 'compose-function';
import { withEffectorProvider } from './with-effector';

export const withProviders = compose(withEffectorProvider);
