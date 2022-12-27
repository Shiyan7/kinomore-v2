"use client";
import clsx from "clsx";
import { searchModel } from "entities/search-window";
import { useToggler } from "shared/lib/hooks";
import { Title, Modal, CloseIcon } from "shared/ui";
import { SearchInput } from "./search-input";
import { SearchList } from "./search-list";
import styles from "./styles.module.scss";

export const SearchWindow = () => {
  const { close, isOpen } = useToggler(searchModel.searchInstance);

  return (
    <Modal isOpen={isOpen} close={close} className={styles.window}>
      <button className={clsx("btn-reset", styles.close)} type="button" onClick={close}>
        <CloseIcon />
      </button>
      <div className={styles.container}>
        <Title className={styles.title} size="large">
          Поиск
        </Title>
        <SearchInput />
        <SearchList />
      </div>
    </Modal>
  );
};
