import { sample } from 'effector';
import { reset } from 'patronum/reset';
import { authModel } from 'widgets/auth';
import { favoritesModel } from 'features/favorites';
import { searchModel } from 'entities/search-window';
import { navigationModel } from 'shared/navigation';

reset({
  clock: navigationModel.$router,
  target: [
    searchModel.$search,
    searchModel.$debouncedValue,
    authModel.$progress,
    authModel.$state,
    favoritesModel.$allFavorites,
    favoritesModel.$pending,
  ],
});

sample({
  clock: navigationModel.$router,
  target: [searchModel.searchToggler.close, authModel.emailForm.reset, authModel.passwordForm.reset],
});
