import { sample } from 'effector';
import { reset } from 'patronum/reset';
import { authModel } from 'widgets/auth';
import { searchModel } from 'entities/search-window';
import { navigationModel } from 'shared/navigation';

reset({
  clock: navigationModel.$router,
  target: [searchModel.$search, searchModel.$debouncedValue, authModel.$progress, authModel.$state],
});

sample({
  clock: navigationModel.$router,
  target: [searchModel.toggler.close, authModel.emailForm.reset, authModel.passwordForm.reset],
});
