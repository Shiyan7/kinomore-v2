import { reset } from 'patronum/reset';
import { movieModel } from 'pages/movie';
import { authModel } from 'widgets/auth';
import { favoritesModel } from 'features/favorites';
import { searchModel } from 'entities/search-window';
import { navigationModel } from 'shared/navigation';
import { headerModel } from 'widgets/header';
import { favoritesPageModel } from 'pages/favorites';

reset({
  clock: navigationModel.$asPath,
  target: [
    authModel.$state,
    authModel.$email,
    movieModel.$rating,
    searchModel.$query,
    searchModel.$search,
    authModel.$password,
    movieModel.$isRated,
    authModel.$progress,
    favoritesPageModel.$data,
    favoritesModel.$isFavorite,
    favoritesPageModel.$pending,
    searchModel.toggler.$isOpen,
    headerModel.toggler.$isOpen,
  ],
});
