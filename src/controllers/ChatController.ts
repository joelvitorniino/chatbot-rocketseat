import { ChatRepository } from "../repositories/ChatRepository";

export class ChatController {
    public repository: ChatRepository = new ChatRepository();

    async index() {
        return await this.repository.findAll();
    };

    async store(messageObject: any) {
        const { author, message } = messageObject;
        return await this.repository.create({
            message_author: author,
            message
        });
    };
};