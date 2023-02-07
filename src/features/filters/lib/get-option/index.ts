import type { SelectOption } from 'features/filters';

export function getOption(options: SelectOption[], value: string): string | undefined {
  const option = options.filter((option) => !!option.value).find((option) => option.value === value);
  return option?.label;
}
