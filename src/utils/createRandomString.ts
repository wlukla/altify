const createRandomString = (size: number): string => {
  const possibleChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  return Array(size)
    .fill(null)
    .map(() => possibleChars[Math.floor(Math.random() * possibleChars.length)])
    .join('');
};

export default createRandomString;
