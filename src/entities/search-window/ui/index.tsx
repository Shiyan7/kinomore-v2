"use client";
import clsx from "clsx";
import { useToggler } from "shared/lib/hooks";
import { searchInstance } from "../model";
import styles from "./styles.module.scss";

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchInstance);

  return (
    <div className={clsx(styles.window, isOpen && styles.opened)}>
      <button type="button" onClick={close}>
        close
      </button>
      <input />
    </div>
  );
};
