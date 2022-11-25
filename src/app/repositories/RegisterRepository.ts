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

    async findByIdAndUpdate(id_chat: number, { password_chat_resetToken, password_chat_resetExpires }) {
        return await Register.update({ password_chat_resetToken, password_chat_resetExpires }, {
            where: { id_chat }
        });
    };

    async findByName({ name_chat }) {
        return await Register.findOne({
            where: {
                name_chat,
            }
        });
    }
};