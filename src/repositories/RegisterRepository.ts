import { Register } from "../models/Register";

export class RegisterRepository {
    async create({ name_chat, email_chat, password_chat}) {
        return await Register.create({
            name_chat,
            email_chat,
            password_chat
        });
    };

    async deleteById(id_chat: number) {
        return await Register.destroy({ where: { id_chat } });
    };

    async findOne({ email_chat }) {
        return await Register.findOne({
            where: {
                email_chat,
            }
        });
    }

    async findAll() {
        return await Register.findAll();
    };
};