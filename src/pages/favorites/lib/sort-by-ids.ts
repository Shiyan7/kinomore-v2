type Id = { id: number };

type SortByIdsParams = {
  array: number[];
  data: Id[] | null;
};

export function sortByIds<T>({ array, data }: SortByIdsParams) {
  return data?.sort((a, b) => array.indexOf(b.id) - array.indexOf(a.id)) as T;
}
