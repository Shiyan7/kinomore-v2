import clsx from 'clsx';
import { useRouter } from 'next/router';
import { CSSTransition } from 'react-transition-group';
import { movieModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { Title, Popup, Icon } from 'shared/ui';
import { items } from '../config';
import { useCopyToClipboard } from '../lib';
import styles from './styles.module.scss';

export const ShareModal = () => {
  const [copy] = useCopyToClipboard();
  const { asPath } = useRouter();
  const { close, isOpen } = useToggler(movieModel.shareToggler);
  const URL = `${process.env.CLIENT_URL}${asPath}`;

  const handleCopy = () => {
    copy(URL);
    close();
  };

  return (
    <CSSTransition
      classNames={{ enterDone: styles.done }}
      in={isOpen}
      timeout={0}
    >
      <Popup
        className={styles.modal}
        close={close}
        isOpen={isOpen}
        rootClassName={styles.root}
      >
        <div className={styles.content}>
          <Title as="h2" className={styles.title} size="small">
            Поделится
          </Title>
          <div className={styles.btns}>
            {items.map(({ icon, text, button }) => {
              const Button = button;

              return (
                <Button
                  className={clsx('btn-reset', styles.btn)}
                  key={text}
                  resetButtonStyle={false}
                  url={URL}
                >
                  {icon}
                  {text}
                </Button>
              );
            })}
          </div>
          <button
            className={clsx('btn-reset', styles.copy)}
            onClick={handleCopy}
          >
            <span className={styles.icon}>
              <Icon name="common/link" />
            </span>
            Копировать ссылку
          </button>
        </div>
      </Popup>
    </CSSTransition>
  );
};
