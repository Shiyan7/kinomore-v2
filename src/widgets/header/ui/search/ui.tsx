import clsx from "clsx";
import { useStore } from "effector-react";
import { SearchIcon } from "shared/ui/icons";
import { $searchStore, showSearchWindow } from "./model";
import styles from "./styles.module.scss";

export const Search = () => {
  const state = useStore($searchStore);

  console.log(state);

  return (
    <button onClick={() => showSearchWindow()} type="button" className={clsx("btn-reset", styles.btn)}>
      <SearchIcon />
    </button>
  );
};
