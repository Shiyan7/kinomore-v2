import clsx from 'clsx';
import { ReactNode, useRef, useState } from 'react';
import { useOnClickOutside } from 'shared/lib';
import { CheckIcon, ChevronIcon } from 'shared/ui/icons';
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
  className?: string;
  startIcon?: ReactNode;
  onSelect: (option: SelectOption) => void;
}

export const Select = ({
  className,
  options,
  onSelect,
  value,
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
        {selected?.value ? selected.label : defaultValue}
        <span className={styles.arrow}>
          <ChevronIcon />
        </span>
      </div>
      <div className={clsx(styles.options, styles[placement])}>
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
