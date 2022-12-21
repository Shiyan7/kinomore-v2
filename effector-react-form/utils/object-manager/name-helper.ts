import { getName, GetName } from './get-name';
import { getNameStr, GetNameStr } from './get-name-str';

type NameHelper<Values extends object> = {
  getPath: GetName<Values>;
  getStr: GetNameStr<Values>;
};

export const createNameHelper = <Values extends object>(): NameHelper<Values> => ({
  getPath: getName,
  getStr: getNameStr,
});
