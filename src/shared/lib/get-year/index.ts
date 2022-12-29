const MIN_YEAR = 1960;

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getYears = () => {
  return `${MIN_YEAR}-${getCurrentYear()}`;
};
