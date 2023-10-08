import { atom } from 'shared/factory';
import { createToggler } from 'shared/lib/toggler';

export const headerModel = atom(() => {
  const toggler = createToggler();

  return {
    toggler,
  };
});
