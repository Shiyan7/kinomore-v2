import clsx from "clsx";
import { SearchIcon } from "shared/ui/icons";
import styles from "./styles.module.scss";
import { createEvent, createStore, combine } from "effector";
import { useStore } from "effector-react";

const handleOpen = createEvent();

const $isOpened = createStore<boolean>(false).on(handleOpen, (n) => !n);

export const Search = () => {
  const isOpened = useStore($isOpened);

  return (
    <button onClick={() => handleOpen()} type="button" className={clsx("btn-reset", styles.btn)}>
      <SearchIcon />
    </button>
  );
};
