export type GetNameStr<Obj> = {
  <K0 extends keyof Obj>(k0: K0): string;

  <K0 extends keyof Obj, K1 extends keyof Obj[K0]>(k0: K0, k1: K1): string;

  <K0 extends keyof Obj, K1 extends keyof Obj[K0], K2 extends keyof Obj[K0][K1]>(k0: K0, k1: K1, k2: K2): string;

  <K0 extends keyof Obj, K1 extends keyof Obj[K0], K2 extends keyof Obj[K0][K1], K3 extends keyof Obj[K0][K1][K2]>(
    k0: K0,
    k1: K1,
    k2: K2,
    k3: K3,
  ): string;

  <
    K0 extends keyof Obj,
    K1 extends keyof Obj[K0],
    K2 extends keyof Obj[K0][K1],
    K3 extends keyof Obj[K0][K1][K2],
    K4 extends keyof Obj[K0][K1][K2][K3]
  >(
    k0: K0,
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
  ): string;

  <
    K0 extends keyof Obj,
    K1 extends keyof Obj[K0],
    K2 extends keyof Obj[K0][K1],
    K3 extends keyof Obj[K0][K1][K2],
    K4 extends keyof Obj[K0][K1][K2][K3],
    K5 extends keyof Obj[K0][K1][K2][K3][K4]
  >(
    k0: K0,
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
    k5: K5,
  ): string;

  <
    K0 extends keyof Obj,
    K1 extends keyof Obj[K0],
    K2 extends keyof Obj[K0][K1],
    K3 extends keyof Obj[K0][K1][K2],
    K4 extends keyof Obj[K0][K1][K2][K3],
    K5 extends keyof Obj[K0][K1][K2][K3][K4],
    K6 extends keyof Obj[K0][K1][K2][K3][K4][K5]
  >(
    k0: K0,
    k1: K1,
    k2: K2,
    k3: K3,
    k4: K4,
    k5: K5,
    k6: K6,
  ): string;
};

export const getNameStr = (...keys: any): any => keys.join('.');
