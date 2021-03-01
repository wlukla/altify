const getRandomChar = (): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';

  return characters.charAt(Math.floor(Math.random() * characters.length));
};

export default getRandomChar;
