import { isWordsValid } from "./isWordsValid";

export const authorFieldValidator = (_, value) => {
  // Validation logic for Georgian Symbols
  const isGeorgianValid = /^[ა-ჰ\s]+$/.test(value);

  // Validation logic for Words (example rule: at least two words)
  const isWordValid = isWordsValid(value);

  // Check both conditions and return the validation result
  if (isGeorgianValid && isWordValid) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Invalid input"));
  }
};
