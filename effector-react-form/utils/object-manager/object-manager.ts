// @ts-nocheck
import stringToPath from 'lodash.topath';

/**
 * @param {object} state Redux state
 * @param path
 * @param removeEmpty
 * @param inDeep should be false for inlineMap
 * @param index
 * @returns {object} State
 */
export const deleteIn = <Obj = any>(
  state: Obj,
  path: string | string[],
  removeEmpty = false,
  inDeep = true, // false for inlineMap
  index = 0,
): any => {
  let pathArray = index === 0 ? stringToPath(path) : path;
  if (!inDeep) {
    pathArray = [path];
  }

  const currentKey = pathArray[index];

  if (!state) {
    return state;
  }

  const isEndPoint = pathArray.length - 1 === index;
  const isArray = Array.isArray(state);
  const isObject = !isArray && typeof state === 'object';
  // @ts-ignore
  const newState = isArray ? [...state] : { ...state };

  if (isObject) {
    if (isEndPoint) {
      // tslint:disable-next-line:no-dynamic-delete
      delete newState[currentKey];
      return newState;
    } else {
      const result = deleteIn(newState[currentKey], pathArray, removeEmpty, inDeep, index + 1);
      const isRemoveEmpty = !result || (removeEmpty && (!result || !Object.keys(result).length));
      if (isRemoveEmpty) {
        // tslint:disable-next-line:no-dynamic-delete
        delete newState[currentKey];
      } else {
        newState[currentKey] = result;
      }
      return newState;
    }
  } else if (isArray) {
    if (isEndPoint) {
      // @ts-ignore
      return newState.filter((_, i) => Number(currentKey) !== i);
    } else {
      const result = deleteIn(newState[currentKey], pathArray, removeEmpty, inDeep, index + 1);
      const isRemoveEmpty = !result || (removeEmpty && (!result || !Object.keys(result).length));
      if (isRemoveEmpty) {
        // @ts-ignore
        return newState.filter((_, i) => Number(currentKey) !== i);
      } else {
        newState[currentKey] = result;
      }
      return newState;
    }
  }
};

/**
 *
 * @param {object} state Object will be expand
 * @param {string} path Path in object
 * @param {*} value Value will be add
 * @param {number} pathIndex Not require
 * @returns {object} State
 */
export const setIn = <Obj = any, Result = any | any[]>(
  state: Obj,
  path: string | string[],
  value,
  pathIndex = 0,
): Result => {
  const pathArray = pathIndex === 0 ? stringToPath(path) : path;

  if (pathIndex >= pathArray.length) {
    return value;
  }

  const first = pathArray[pathIndex];
  const firstState = state && (Array.isArray(state) ? state[Number(first)] : state[first]);
  const next = setIn(firstState, pathArray, value, pathIndex + 1);

  if (!state) {
    if (isNaN(first)) {
      return {[first]: next} as unknown as Result;
    }
    const initialized = [];
    // @ts-ignore
    initialized[parseInt(first, 10)] = next;
    // @ts-ignore
    return initialized;
  }

  if (Array.isArray(state)) {
    // @ts-ignore
    const copy = [].concat(state);
    // @ts-ignore
    copy[parseInt(first, 10)] = next;
    // @ts-ignore
    return copy;
  }

  // @ts-ignore
  return {
    ...state,
    [first]: next,
  };
};

/**
 *
 * @param {object} state Redux state
 * @param {string} field Path to field
 * @param {*?} defaultValue
 * @returns {object} State
 */
export const getIn = <Obj, Result>(state: Obj, field: string | string[], defaultValue?: Result): Result => {
  if (!state) {
    return defaultValue;
  }
  const path: string[] = Array.isArray(field) ? field : stringToPath(field);

  const { length } = path;
  if (!length) {
    return defaultValue;
  }

  let result = state;
  for (let i = 0; i < length && result; i += 1) {
    result = result[path[i]];
  }
  // @ts-ignore
  return result ?? defaultValue;
};

export const makeNested = <Result = Record<string, any>>(inlineMap: Record<string, any>): Result =>
  Object.entries(inlineMap).reduce((acc, [key, value]) => setIn(acc, key, value), {} as Result);

const isFieldMeta = (value) => typeof value === 'object' && value._type === 'fieldMeta';

export const removeFromInlineMap = (map: Record<string, any>, key: string) => {
  const nestedMap = deleteIn(makeNested(map), key);
  const nodes = [{ node: nestedMap, path: [] }];
  const newInlineMap = {};

  while (nodes.length) {
    const currentNode = nodes.pop();
    Object.entries(currentNode.node).forEach(([k, v]) => {
      if (isFieldMeta(v)) {
        newInlineMap[currentNode.path.concat(k).join('.')] = v;
      } else {
        nodes.push({
          node: v,
          path: currentNode.path.concat(k),
        });
      }
    });
  }

  return newInlineMap;
};

export const makeConsistentKey = (key: string | string[]) => {
  if (Array.isArray(key)) {
    return key.join('.');
  }

  return stringToPath(key).join('.');
};
