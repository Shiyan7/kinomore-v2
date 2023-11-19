import {
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
  VKShareButton,
  FacebookShareButton,
  EmailShareButton,
} from 'react-share';
import { Icon } from 'shared/ui/icon';

export const items = [
  { button: TelegramShareButton, text: 'Telegram', icon: <Icon name="social/telegram" /> },
  { button: ViberShareButton, text: 'Viber', icon: <Icon name="social/viber" /> },
  { button: FacebookShareButton, text: 'Лента новостей', icon: <Icon name="social/facebook" /> },
  { button: WhatsappShareButton, text: 'WhatsApp', icon: <Icon name="social/whatsapp" /> },
  { button: VKShareButton, text: 'ВКонтакте', icon: <Icon name="social/vk" /> },
  { button: EmailShareButton, text: 'Gmail', icon: <Icon name="social/gmail" /> },
];
