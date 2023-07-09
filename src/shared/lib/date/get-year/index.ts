const MIN_YEAR = 0;

export const getCurrentYear = () =>
  // return new Date().getFullYear();
  2022;
export const getYears = () => `${MIN_YEAR}-${getCurrentYear()}`;
