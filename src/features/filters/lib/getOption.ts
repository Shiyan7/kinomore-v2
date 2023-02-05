import type { SelectOption } from 'shared/ui/select';

export function getOption(options: SelectOption[], value: string): string | undefined {
  const option = options.filter((option) => !!option.value).find((option) => option.value === value);
  return option?.label;
}
