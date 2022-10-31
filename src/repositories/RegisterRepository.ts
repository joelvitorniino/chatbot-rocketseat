import { Register } from "../models/Register";

export class RegisterRepository {
    async create(data: any) {
        return await Register.create(data);
    };

    async findAll() {
        return await Register.findAll();
    }
};