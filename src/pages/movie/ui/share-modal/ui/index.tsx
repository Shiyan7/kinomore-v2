import clsx from 'clsx';
import { useRouter } from 'next/router';
import { TelegramShareButton, ViberShareButton, WhatsappShareButton } from 'react-share';
import { CSSTransition } from 'react-transition-group';
import { pageModel } from 'pages/movie';
import { useToggler } from 'shared/lib/toggler';
import { LinkIcon, WhatsappIcon, TelegramIcon, ViberIcon } from 'shared/ui/icons';
import { Popup } from 'shared/ui/popup';
import { useCopyToClipboard } from '../lib';
import { Info } from './info';
import styles from './styles.module.scss';

const items = [
  { button: TelegramShareButton, text: 'Telegram', icon: <TelegramIcon /> },
  { button: ViberShareButton, text: 'Viber', icon: <ViberIcon /> },
  { button: WhatsappShareButton, text: 'WhatsApp', icon: <WhatsappIcon /> },
];

export const ShareModal = () => {
  const [copy] = useCopyToClipboard();
  const { asPath } = useRouter();
  const shareModal = useToggler(pageModel.shareModalToggler);
  const URL = `${process.env.CLIENT_URL}${asPath}`;

  const handleCopy = () => {
    copy(URL);
    shareModal.close();
  };

  return (
    <CSSTransition in={shareModal.isOpen} timeout={0} classNames={{ enterDone: styles.done }}>
      <Popup rootClassName={styles.root} className={styles.modal} isOpen={shareModal.isOpen} close={shareModal.close}>
        <Info />
        <div className={styles.content}>
          <button onClick={handleCopy} className={clsx('btn-reset', styles.btn)}>
            <span>Скопировать ссылку</span>
            <LinkIcon />
          </button>
          {items.map((item, idx) => {
            const Button = item.button;

            return (
              <Button key={idx} resetButtonStyle={false} url={URL} className={clsx('btn-reset', styles.btn)}>
                <span>{item.text}</span>
                {item.icon}
              </Button>
            );
          })}
        </div>
        <Popup.Close onClick={shareModal.close} />
      </Popup>
    </CSSTransition>
  );
};
