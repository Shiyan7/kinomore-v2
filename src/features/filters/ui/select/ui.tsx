import clsx from 'clsx';
import { useRef, useState, type ReactNode } from 'react';
import type { SelectOption } from 'features/filters';
import { useOnClickOutside } from 'shared/lib';
import { Icon } from 'shared/ui/icon';
import styles from './styles.module.scss';

interface SelectProps {
  options: SelectOption[];
  value: string | string[] | undefined;
  placement?: 'bottom-start' | 'bottom-end';
  label: string;
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
  label,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((option) => option?.value === value) ?? options[0];
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option: SelectOption) => {
    onSelect(option);
    handleClose();
  };

  return (
    <div className={clsx(styles.select, isOpen && styles.isOpen, className)} ref={selectRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.top}>
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        <span className={styles.value}>{selected.value ? selected.label : label}</span>
        <span className={styles.arrow}>
          <Icon type="common" name="chevron" />
        </span>
      </div>
      <div className={clsx(styles.options, styles[placement])}>
        {options?.map((option) => {
          const isSelected = selected.value === option?.value;

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
  );
};
