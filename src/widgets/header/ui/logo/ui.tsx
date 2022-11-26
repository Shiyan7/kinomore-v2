import Image from "next/image";
import styles from "./styles.module.scss";

export const Logo = () => {
  return <Image className={styles.logo} width={131} height={26} src="/logo.svg" alt="Kinomore" />;
};
