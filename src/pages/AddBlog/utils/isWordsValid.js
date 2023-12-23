export const isWordsValid = (value) => {
  const words = value.trim().split(/\s+/);
  const firstWord = words[0]?.length >= 2;
  const secondWord = words[1]?.length >= 5;

  if (firstWord && secondWord) {
    return words;
  }
};
