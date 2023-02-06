import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';
import { useOnClickOutside } from 'shared/lib';
import { CheckIcon, ChevronIcon, CloseIcon, Title } from 'shared/ui';
import styles from './styles.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | string[] | undefined;
  placement?: 'bottom-start' | 'bottom-end';
  defaultValue: string;
  label?: string;
  className?: string;
  startIcon?: ReactNode;
  onSelect: (option: SelectOption) => void;
}

export const Select = ({
  className,
  options,
  onSelect,
  value,
  label,
  placement = 'bottom-start',
  startIcon,
  defaultValue,
}: SelectProps) => {
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
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        <div className={styles.text}>
          <span className={styles.label}>{label}</span>
          <span className={styles.caption}>{selected.label}</span>
        </div>
        <span className={styles.value}>{selected?.value ? selected.label : defaultValue}</span>
        <span className={styles.arrow}>
          <ChevronIcon />
        </span>
      </div>
      <div className={clsx(styles.options, styles[placement])}>
        <div className={styles.header}>
          <Title size="medium">{label}</Title>
          <button onClick={handleClose} className={clsx('btn-reset', styles.close)}>
            <CloseIcon />
          </button>
        </div>
        {options?.map((option, idx) => {
          const isSelected = selected?.value === option?.value;

          return (
            <div
              onClick={() => handleSelect(option)}
              key={idx}
              className={clsx(styles.option, isSelected && styles.isSelected)}>
              {option?.label}
              <span className={styles.check}>
                <CheckIcon />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
