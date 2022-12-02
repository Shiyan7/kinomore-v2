import Link from "next/link";
import clsx from "clsx";
import { RoutesEnum } from "shared/config";
import { ProfileIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

export const Profile = () => {
  const isAuth = false;

  const ProfileLink = (
    <Link href={RoutesEnum.Cabinet} className={styles.profile}>
      <ProfileIcon />
      Кабинет
    </Link>
  );

  const ProfileButton = (
    <button type="button" className={clsx("btn-reset", styles.profile)}>
      <ProfileIcon />
      Войти
    </button>
  );

  return isAuth ? ProfileLink : ProfileButton;
};