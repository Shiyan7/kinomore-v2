import clsx from 'clsx';
import type { SelectOption } from 'features/filters';
import { useRef, useState, type ReactNode } from 'react';
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
  const selected =
    options.find((option) => option?.value === value) ?? options[0];
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  useOnClickOutside(selectRef, handleClose);

  const handleSelect = (option: SelectOption) => () => {
    onSelect(option);
    handleClose();
  };

  return (
    <div
      className={clsx(styles.select, isOpen && styles.isOpen, className)}
      ref={selectRef}
    >
      <div className={styles.top} onClick={() => setIsOpen(!isOpen)}>
        {startIcon ? <span className={styles.icon}>{startIcon}</span> : null}
        <span className={styles.value}>
          {selected.value ? selected.label : label}
        </span>
        <span className={styles.arrow}>
          <Icon name="common/chevron" />
        </span>
      </div>
      <div className={clsx(styles.options, styles[placement])}>
        {options?.map((option) => {
          const isSelected = selected.value === option?.value;

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
  );
};
