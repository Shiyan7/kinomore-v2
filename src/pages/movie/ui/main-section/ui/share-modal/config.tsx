import {
  TelegramShareButton,
  ViberShareButton,
  WhatsappShareButton,
  VKShareButton,
  FacebookShareButton,
  EmailShareButton,
} from 'react-share';
import { WhatsappIcon, TelegramIcon, ViberIcon, VkIcon, FacebookIcon, GmailIcon } from 'shared/ui/icons';

export const items = [
  { button: TelegramShareButton, text: 'Telegram', icon: <TelegramIcon /> },
  { button: ViberShareButton, text: 'Viber', icon: <ViberIcon /> },
  { button: WhatsappShareButton, text: 'WhatsApp', icon: <WhatsappIcon /> },
  { button: VKShareButton, text: 'ВКонтакте', icon: <VkIcon /> },
  { button: FacebookShareButton, text: 'Лента новостей', icon: <FacebookIcon /> },
  { button: EmailShareButton, text: 'Gmail', icon: <GmailIcon /> },
];
