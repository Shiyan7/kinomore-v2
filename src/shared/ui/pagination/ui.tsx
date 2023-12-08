/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Icon } from '../icon';
import { usePagination } from './lib';
import styles from './styles.module.scss';

interface PaginationProps {
  total: number;
  page: number;
  className?: string;
  onChange: (page: number) => void;
}

export const Pagination = ({ total, page, onChange }: PaginationProps) => {
  const rangeRef = useRef<HTMLButtonElement>(null);

  const { active, next, previous, range, setPage } = usePagination({
    total,
    page,
    onChange,
    siblings: 2,
  });

  useEffect(() => {
    rangeRef.current?.scrollIntoView({
      inline: 'center',
    });

    window.scrollTo(0, 0);
  }, [page]);

  if (total < 2) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={clsx('btn-reset', styles.prev)}
        disabled={page === 1}
        onClick={previous}
      >
        <Icon name="common/chevron" />
      </button>
      <div className={styles.range}>
        {range.map((item, idx) => {
          const isNumberItem = item !== 'dots';
          const isLeftDot = idx <= 2;
          const isActive = active === item;

          return isNumberItem ? (
            <button
              className={clsx('btn-reset', styles.item, {
                [styles.activeItem]: isActive,
              })}
              disabled={item === page}
              key={idx}
              onClick={() => setPage(item)}
              ref={isActive ? rangeRef : undefined}
            >
              {item}
            </button>
          ) : (
            <button
              className={clsx('btn-reset', styles.dots, {
                [styles.isLeftDots]: isLeftDot,
                [styles.isRightDots]: !isLeftDot,
              })}
              key={idx}
              onClick={() => setPage(isLeftDot ? page - 5 : page + 5)}
              title={`${isLeftDot ? 'Предыдущие' : 'Следующие'} 5 страниц`}
            >
              •••
              <Icon name="common/arrows" />
            </button>
          );
        })}
      </div>
      <button
        className={clsx('btn-reset', styles.next)}
        disabled={page === total}
        onClick={next}
      >
        <Icon name="common/chevron" />
      </button>
    </div>
  );
};
