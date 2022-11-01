import { hashSync } from "bcryptjs";

export const hashPassword = (password: any) => {
    return hashSync(password, 8);
};