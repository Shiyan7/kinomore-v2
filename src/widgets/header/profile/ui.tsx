import Link from "next/link";
import { RoutesEnum } from "shared/config";
import { ProfileIcon } from "shared/ui/icons";
import clsx from "clsx";
import styles from "./styles.module.scss";

export const Profile = () => {
  const isAuth = false;
  const name = "Евгений";

  const ProfileLink = (
    <Link href={RoutesEnum.Cabinet} className={clsx("btn-reset", styles.profile)}>
      <ProfileIcon />
      {name}
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
