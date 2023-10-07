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
    <CSSTransition in={isOpen} timeout={0} classNames={{ enterDone: styles.done }}>
      <Popup rootClassName={styles.root} className={styles.modal} isOpen={isOpen} close={close}>
        <div className={styles.content}>
          <Title className={styles.title} size="small" as="h2">
            Поделится
          </Title>
          <div className={styles.btns}>
            {items.map(({ icon, text, button }) => {
              const Button = button;

              return (
                <Button key={text} resetButtonStyle={false} url={URL} className={clsx('btn-reset', styles.btn)}>
                  {icon}
                  {text}
                </Button>
              );
            })}
          </div>
          <button onClick={handleCopy} className={clsx('btn-reset', styles.copy)}>
            <span className={styles.icon}>
              <Icon type="common" name="link" />
            </span>
            Копировать ссылку
          </button>
        </div>
      </Popup>
    </CSSTransition>
  );
};
