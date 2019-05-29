export const strcmp = (a, b) => {
  const lowerA = a.toLowerCase();
  const lowerB = b.toLowerCase();

  return lowerA > lowerB ? 1 : lowerA === lowerB ? 0 : -1;
};
