import bcrypt from "bcrypt";

const saltRounds: number = 20;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}