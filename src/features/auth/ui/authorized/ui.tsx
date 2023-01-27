import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { authModel } from 'features/auth';
import { RoutesEnum } from 'shared/config';
import { Message } from '../message';
import { Transition } from '../transition';
import { maskString } from './lib';
import styles from './styles.module.scss';

export const Authorized = () => {
  const { push } = useRouter();
  const { password } = useStore(authModel.passwordForm.$values);
  const hashPassword = maskString(password);
  const state = useStore(authModel.$state);
  const isAuthorizedState = state === 'authorized';

  useEffect(() => {
    if (isAuthorizedState) {
      setTimeout(() => {
        push(RoutesEnum.Profile);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorizedState]);

  return (
    <>
      <Transition offset={30} delay={310}>
        <Message className={styles.message} position="right" title={hashPassword} />
      </Transition>
      <Transition offset={30} delay={900}>
        <Message isSuccess title="Вы успешно вошли" />
      </Transition>
    </>
  );
};
