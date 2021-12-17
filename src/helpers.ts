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

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
