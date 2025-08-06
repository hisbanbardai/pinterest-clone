import bcrypt from "bcrypt";

export const hashPassword = async function (password: string) {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async function (
  password: string,
  dbPassword: string
) {
  return await bcrypt.compare(password, dbPassword);
};
