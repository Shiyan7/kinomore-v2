import compose from 'compose-function';
import { withGoogleOAuth } from './with-google-oauth';
import { withEffectorNext } from './with-effector-next';

export const withProviders = compose(withEffectorNext, withGoogleOAuth);
