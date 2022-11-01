import { ChatRepository } from "../repositories/ChatRepository";

export class ChatController {
    public repository: ChatRepository = new ChatRepository();

    async index() {
        return await this.repository.findAll();
    };

    async store(messageObject: { author: string, message: string }) {
        return await this.repository.create({
            message_author: messageObject.author,
            message: messageObject.message
        });
    };
};