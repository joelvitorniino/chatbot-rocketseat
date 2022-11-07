import { Sequelize } from "sequelize";
import { Chat } from "../models/Chat";

export class ChatRepository {
    async findAll() {
        return await Chat.findAll();
    };

    async create({ message_author, message }) {
        return await Chat.create({
            message_author, 
            message
        });
    };
}