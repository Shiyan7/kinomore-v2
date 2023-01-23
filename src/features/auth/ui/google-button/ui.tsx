import clsx from 'clsx';
import { useGoogleLogin } from '@react-oauth/google';
import { authModel } from 'features/auth';
import { GoogleIcon } from 'shared/ui/icons';
import { Transition } from '../transition';
import styles from './styles.module.scss';

export const GoogleButton = () => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => authModel.googleLogin(tokenResponse.access_token),
  });

  return (
    <>
      <Transition delay={100}>
        <button onClick={() => login()} type="button" className={clsx('btn-reset', styles.logo)}>
          <GoogleIcon />
        </button>
      </Transition>
      <Transition delay={130}>
        <span className={styles.sep}>или</span>
      </Transition>
    </>
  );
};
