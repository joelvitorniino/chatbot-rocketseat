import { Register } from "../models/Register";

export class RegisterRepository {
    async create(data: any) {
        return await Register.create(data);
    };

    async deleteById(id_chat: number) {
        return await Register.destroy({ where: { id_chat } });
    };

    async findAll() {
        return await Register.findAll();
    };
};