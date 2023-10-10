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
    searchModel.$query,
    authModel.$progress,
    authModel.$state,
    authModel.$email,
    authModel.$password,
    favoritesModel.$isFavorite,
    favoritesModel.$allFavorites,
    favoritesModel.$pending,
  ],
});

sample({
  clock: navigationModel.$router,
  target: searchModel.searchToggler.close,
});
