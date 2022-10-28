import { Sequelize } from "sequelize";
import { Chat } from "../model/Chat";

export class ChatRepository {
    async findAll() {
        return await Chat.findAll();
    };

    async create(data: any) {
        return await Chat.create(data);
    };
}