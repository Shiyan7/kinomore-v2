import { useRouter } from 'next/router';

export function usePageChange() {
  const { query, push } = useRouter();

  const page = Number(query.page ?? 1);

  const onChange = (page: number) => {
    push({ query: { ...query, page } });
  };

  return {
    onChange,
    page,
  };
}
