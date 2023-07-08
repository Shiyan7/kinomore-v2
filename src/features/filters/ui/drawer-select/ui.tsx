import clsx from 'clsx';
import { useRef, useState } from 'react';
import type { SelectOption } from 'features/filters';
import { useOnClickOutside } from 'shared/lib';
import { Icon, Title } from 'shared/ui';
import styles from './styles.module.scss';

interface DrawerSelectProps {
  options: SelectOption[];
  value: string | string[] | undefined;
  label?: string;
  className?: string;
  onSelect: (option: SelectOption) => void;
}

export const DrawerSelect = ({ className, options, onSelect, value, label }: DrawerSelectProps) => {
  const defaultOption = options.find((option) => option?.value === value);
  const [selected, setSelected] = useState(defaultOption ?? options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    onSelect(option);
    handleClose();
  };

  return (
    <div className={clsx(styles.select, isOpen && styles.isOpen, className)} ref={selectRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.top}>
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          <span className={styles.caption}>{selected.label}</span>
        </div>
        <span className={styles.arrow}>
          <Icon type="common" name="chevron" />
        </span>
      </div>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <Title size="medium">{label}</Title>
          <button onClick={handleClose} className={clsx('btn-reset', styles.close)}>
            <Icon type="common" name="close" />
          </button>
        </div>
        <div className={styles.options}>
          {options?.map((option) => {
            const isSelected = selected?.value === option?.value;

            return (
              <div
                onClick={() => handleSelect(option)}
                key={option.label}
                className={clsx(styles.option, isSelected && styles.isSelected)}
              >
                {option?.label}
                <span className={styles.check}>
                  <Icon type="common" name="check" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
