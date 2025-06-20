import bcrypt from "bcrypt";

export const hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};
