import clsx from "clsx";
import { SearchIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";

export const Search = () => {
  return (
    <button type="button" className={clsx("btn-reset", styles.btn)}>
      <SearchIcon />
    </button>
  );
};
