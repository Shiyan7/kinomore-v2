import { reset } from 'patronum/reset';
import { movieModel } from 'pages/movie';
import { authModel } from 'widgets/auth';
import { favoritesModel } from 'features/favorites';
import { searchModel } from 'entities/search-window';
import { navigationModel } from 'shared/navigation';

reset({
  clock: navigationModel.$router,
  target: [
    authModel.$state,
    authModel.$email,
    movieModel.$rating,
    searchModel.$query,
    searchModel.$search,
    authModel.$password,
    movieModel.$isRated,
    authModel.$progress,
    favoritesModel.$pending,
    favoritesModel.$isFavorite,
    searchModel.toggler.$isOpen,
    favoritesModel.$allFavorites,
  ],
});
