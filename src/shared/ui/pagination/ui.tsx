/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { Icon } from '../icon';
import { usePagination } from './lib';
import styles from './styles.module.scss';

interface PaginationProps {
  total?: number;
  page: number;
  className?: string;
  onChange: (page: number) => void;
}

export const Pagination = ({ total, page, onChange }: PaginationProps) => {
  const { active, next, previous, range, setPage } = usePagination({
    total,
    page,
    onChange,
    siblings: 2,
  });

  const isFirstPage = page === 1;
  const isLastPage = page === total;

  return (
    <div className={styles.pagination}>
      <button
        className={clsx('btn-reset', styles.prev)}
        disabled={isFirstPage}
        onClick={previous}
      >
        <Icon name="common/chevron" />
      </button>
      {range.map((item, idx) => {
        const isNumberItem = item !== 'dots';
        const isLeftDot = idx <= 2;

        return isNumberItem ? (
          <button
            className={clsx('btn-reset', styles.item, {
              [styles.activeItem]: active === item,
            })}
            disabled={item === page}
            key={idx}
            onClick={() => setPage(item)}
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
      <button
        className={clsx('btn-reset', styles.next)}
        disabled={isLastPage}
        onClick={next}
      >
        <Icon name="common/chevron" />
      </button>
    </div>
  );
};
