export const endsWithRedberryGeRegex = /^[^@]*@redberry\.ge$/;
export const emailFieldValidator = (_, value) => {
  if (endsWithRedberryGeRegex.test(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error(""));
  }
};
