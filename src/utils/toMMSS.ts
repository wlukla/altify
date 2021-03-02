const toMMSS = (ms: number): string => {
  const date = new Date(ms);
  const stringData = date.toISOString();

  return stringData.slice(14, -5);
};

export default toMMSS;
