import { sample } from "effector";
import { reset } from "patronum/reset";
import { navigationModel } from "entities/navigation";
import { searchModel } from "entities/search-window";

// Handle reset search string on route change
reset({
	clock: navigationModel.routerUpdated,
	target: [searchModel.$search]
});

// Handle close search instance on router updated
sample({
  clock: navigationModel.routerUpdated,
  target: searchModel.searchInstance.close,
});
