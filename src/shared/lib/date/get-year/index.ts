export const getCurrentYear = () => new Date().getFullYear();

export const getYears = () => `0-${getCurrentYear()}`;
