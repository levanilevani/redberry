import { isWordsValid } from "./isWordsValid";

export const titleFieldValidator = (_, value) => {
  const isWordValid = isWordsValid(value);

  if (isWordValid) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Invalid input"));
  }
};
