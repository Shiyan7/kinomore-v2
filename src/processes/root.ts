import { sample } from "effector";
import { reset } from "patronum/reset";
import { authModel } from "features/auth";
import { navigationModel } from "entities/navigation";
import { searchModel } from "entities/search-window";

// Handle reset search string on route change
reset({
  clock: navigationModel.routerUpdated,
  target: [searchModel.$search, authModel.$progress, authModel.$state],
});

// Handle close search instance on router updated
sample({
  clock: navigationModel.routerUpdated,
  target: searchModel.searchInstance.close,
});

// Handle reset auth form on router updated
sample({
  clock: navigationModel.routerUpdated,
  target: [authModel.emailForm.reset, authModel.passwordForm.reset],
});
