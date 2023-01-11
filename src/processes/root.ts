import { sample } from 'effector';
import { reset } from 'patronum/reset';
import { authModel } from 'features/auth';
import { navigationModel } from 'entities/navigation';
import { searchModel } from 'entities/search-window';

reset({
  clock: navigationModel.routerUpdated,
  target: [searchModel.$search, searchModel.$debouncedValue, authModel.$progress, authModel.$state],
});

sample({
  clock: navigationModel.routerUpdated,
  target: [searchModel.searchWindowToggler.close, authModel.emailForm.reset, authModel.passwordForm.reset],
});
