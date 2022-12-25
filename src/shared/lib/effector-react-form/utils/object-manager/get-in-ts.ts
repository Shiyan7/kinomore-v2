import { getIn } from './object-manager';

export function getInTs<Obj extends object, K0 extends keyof Obj>(obj: Obj, k0: K0): Obj[K0];

export function getInTs<Obj extends object, K0 extends keyof Obj, K1 extends keyof Obj[K0]>(
  obj: Obj,
  k0: K0,
  k1: K1,
): Obj[K0][K1];

export function getInTs<
  Obj extends object,
  K0 extends keyof Obj,
  K1 extends keyof Obj[K0],
  K2 extends keyof Obj[K0][K1]
>(obj: Obj, k0: K0, k1: K1, k2: K2): Obj[K0][K1][K2];

export function getInTs<
  Obj extends object,
  K0 extends keyof Obj,
  K1 extends keyof Obj[K0],
  K2 extends keyof Obj[K0][K1],
  K3 extends keyof Obj[K0][K1][K2]
>(obj: Obj, k0: K0, k1: K1, k2: K2, k3: K3): Obj[K0][K1][K2][K3];

export function getInTs<
  Obj extends object,
  K0 extends keyof Obj,
  K1 extends keyof Obj[K0],
  K2 extends keyof Obj[K0][K1],
  K3 extends keyof Obj[K0][K1][K2],
  K4 extends keyof Obj[K0][K1][K2][K3]
>(obj: Obj, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4): Obj[K0][K1][K2][K3][K4];

export function getInTs<
  Obj extends object,
  K0 extends keyof Obj,
  K1 extends keyof Obj[K0],
  K2 extends keyof Obj[K0][K1],
  K3 extends keyof Obj[K0][K1][K2],
  K4 extends keyof Obj[K0][K1][K2][K3],
  K5 extends keyof Obj[K0][K1][K2][K3][K4]
>(obj: Obj, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): Obj[K0][K1][K2][K3][K4][K5];

export function getInTs<
  Obj extends object,
  K0 extends keyof Obj,
  K1 extends keyof Obj[K0],
  K2 extends keyof Obj[K0][K1],
  K3 extends keyof Obj[K0][K1][K2],
  K4 extends keyof Obj[K0][K1][K2][K3],
  K5 extends keyof Obj[K0][K1][K2][K3][K4],
  K6 extends keyof Obj[K0][K1][K2][K3][K4][K5]
>(obj: Obj, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): Obj[K0][K1][K2][K3][K4][K5][K6];

export function getInTs(obj: any, ...keys: any): any {
  return getIn(obj, keys);
}
