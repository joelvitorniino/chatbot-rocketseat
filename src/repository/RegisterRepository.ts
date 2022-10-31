import { Register } from "../model/Register";

export class RegisterRepository {
    async create(data: any) {
        await Register.create(data);
    };
};