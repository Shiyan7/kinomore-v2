"use client";
import clsx from "clsx";
import { useToggler, useLockedBody, useEscape } from "shared/lib/hooks";
import { CloseIcon } from "shared/ui/icons";
import { Input } from "shared/ui/input";
import { Title } from "shared/ui/title";
import { searchInstance } from "../model";
import styles from "./styles.module.scss";

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchInstance);

  useLockedBody(isOpen);

  useEscape(close);

  return (
    <div className={clsx(styles.window, isOpen && styles.opened)}>
      <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="large">
          Поиск
        </Title>
        <Input className={styles.input} placeholder="Фильмы, сериалы, персоны" />
      </div>
    </div>
  );
};
