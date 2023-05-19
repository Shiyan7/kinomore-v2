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
  { button: TelegramShareButton, text: 'Telegram', icon: <Icon type="social" name="telegram" /> },
  { button: ViberShareButton, text: 'Viber', icon: <Icon type="social" name="viber" /> },
  { button: FacebookShareButton, text: 'Лента новостей', icon: <Icon type="social" name="facebook" /> },
  { button: WhatsappShareButton, text: 'WhatsApp', icon: <Icon type="social" name="whatsapp" /> },
  { button: VKShareButton, text: 'ВКонтакте', icon: <Icon type="social" name="vk" /> },
  { button: EmailShareButton, text: 'Gmail', icon: <Icon type="social" name="gmail" /> },
];
