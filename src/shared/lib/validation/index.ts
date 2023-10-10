const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const validation = {
  isEmail: (email: string): boolean => emailRegex.test(email),
  isMinPassword: (password: string): boolean => password.length >= 6,
};
