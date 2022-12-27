import { RoutesEnum } from "shared/config";

export const items = [
  { text: "Главная", href: RoutesEnum.Home, timeout: 50 },
  { text: "Фильмы", href: RoutesEnum.Films, timeout: 75 },
  { text: "Сериалы", href: RoutesEnum.Series, timeout: 100 },
  { text: "Мультфильмы", href: RoutesEnum.Cartoons, timeout: 125 },
  { text: "Каталог", href: "#", timeout: 150 },
  { text: "Избранное", href: "#", timeout: 175 },
  { text: "История просмотров", href: "#", timeout: 200 },
];
