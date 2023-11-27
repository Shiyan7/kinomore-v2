import clsx from 'clsx';
import type { SelectOption } from 'features/filters';
import { useRef, useState } from 'react';
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

export const DrawerSelect = ({
  className,
  options,
  onSelect,
  value,
  label,
}: DrawerSelectProps) => {
  const defaultOption = options.find((option) => option?.value === value);
  const [selected, setSelected] = useState(defaultOption ?? options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option: SelectOption) => () => {
    setSelected(option);
    onSelect(option);
    handleClose();
  };

  return (
    <div
      className={clsx(styles.select, isOpen && styles.isOpen, className)}
      ref={selectRef}
    >
      <div className={styles.top} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          <span className={styles.caption}>{selected.label}</span>
        </div>
        <span className={styles.arrow}>
          <Icon name="common/chevron" />
        </span>
      </div>
      <div className={styles.drawer}>
        <div className={styles.header}>
          <Title size="medium">{label}</Title>
          <button
            className={clsx('btn-reset', styles.close)}
            onClick={handleClose}
          >
            <Icon name="common/close" />
          </button>
        </div>
        <div className={styles.options}>
          {options?.map((option) => {
            const isSelected = selected?.value === option?.value;

            return (
              <div
                className={clsx(styles.option, isSelected && styles.isSelected)}
                key={option.label}
                onClick={handleSelect(option)}
              >
                {option?.label}
                <span className={styles.check}>
                  <Icon name="common/check" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
