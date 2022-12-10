import clsx from "clsx";
import { BurgerIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

export const Burger = () => {
  return (
    <button type="button" className={clsx("btn-reset", styles.btn)}>
      <BurgerIcon />
    </button>
  );
};
