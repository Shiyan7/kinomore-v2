import { atom } from 'shared/lib/atom';
import { createToggler } from 'shared/lib/toggler';

export const headerModel = atom(() => {
  const toggler = createToggler();

  return {
    toggler,
  };
});
