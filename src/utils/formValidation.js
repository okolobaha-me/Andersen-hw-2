export const MAX_INPUT_LENGTH = 600;

export const name = name => {
  if (!name.length) return 'empty';

  if (name[0] !== name[0].toUpperCase()) return 'invalid';
  else return 'valid';
};

export const phone = phone => {
  if (!phone.length) return 'empty';

  if (phone.length > 12) return 'invalid';
  else return 'valid';
};

export const date = date => {
  if (!date.length) return 'empty';
  else return 'valid';
};

export const webSite = site => {
  if (!site.length) return 'empty';

  if (site.slice(0, 8) !== 'https://') return 'invalid';

  return 'valid';
};

export const textInput = text => {
  if (!text.length) return 'empty';

  if (text.length > MAX_INPUT_LENGTH) return 'invalid';

  return 'valid';
};

export const symbolsLeft = text => {
  const maxSymbols = MAX_INPUT_LENGTH;
  const symbolsLeft = maxSymbols - text.length;
  if (text.length > maxSymbols) {
    return '';
  }

  return `Осталось ${symbolsLeft}/${maxSymbols} символов`;
};

export const isValidForm = values => {
  for (const value of values) {
    if (value !== 'valid') return false;
  }
  return true;
};
