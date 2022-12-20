"use client";
import clsx from "clsx";
import { useEvent, useStore } from "effector-react";
import { searchModel } from "entities/search-window";
import { useToggler } from "shared/lib/hooks";
import { CloseIcon } from "shared/ui/icons";
import { Input } from "shared/ui/input";
import { Modal } from "shared/ui/modal";
import { Title } from "shared/ui/title";
import styles from "./styles.module.scss";

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchModel.searchInstance);
  const inputValue = useStore(searchModel.$inputValue);
  const setInputValue = useEvent(searchModel.setInputValue);

  return (
    <Modal isOpen={isOpen} close={close} className={clsx(styles.window, isOpen && styles.opened)}>
      <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="large">
          Поиск
        </Title>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.input}
          placeholder="Фильмы, сериалы, персоны"
        />
      </div>
    </Modal>
  );
};
