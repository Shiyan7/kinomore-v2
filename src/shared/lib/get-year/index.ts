const MIN_YEAR = 1960;

export const getCurrentYear = () => {
  // return new Date().getFullYear();
  return 2022;
};

export const getYears = () => {
  return `${MIN_YEAR}-${getCurrentYear()}`;
};
