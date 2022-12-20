"use client";
import clsx from "clsx";
import { useToggler } from "shared/lib/hooks";
import { CloseIcon } from "shared/ui/icons";
import { Input } from "shared/ui/input";
import { Modal } from "shared/ui/modal";
import { Title } from "shared/ui/title";
import { searchInstance } from "../model";
import styles from "./styles.module.scss";

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchInstance);

  return (
    <Modal isOpen={isOpen} close={close} className={clsx(styles.window, isOpen && styles.opened)}>
      <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="large">
          Поиск
        </Title>
        <Input className={styles.input} placeholder="Фильмы, сериалы, персоны" />
      </div>
    </Modal>
  );
};
