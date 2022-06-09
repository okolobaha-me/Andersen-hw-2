export const name = str => {
  if (!str) {
    return false;
  }
  return str[0] === str[0].toUpperCase();
};
