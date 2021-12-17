export const DEFAULT_STATE = {
  name: "",
  nickname: "",
  weight: "",
  height: "",
  gender: "",
  color: "",
  friendliness: "",
  birthday: new Date(),
};

export const isValidNumber = (num: string) => /^-?\d*\.?\d*$/.test(num);

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
