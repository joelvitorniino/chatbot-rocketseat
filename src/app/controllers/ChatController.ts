import { Request, Response } from "express";
import { ChatRepository } from "../repositories/ChatRepository";

export class ChatController {
    public repository: ChatRepository = new ChatRepository();

    async index() {
        return await this.repository.findAll();
    };

    async store({ author, message }) {
        return await this.repository.create({
            message_author: author,
            message: message
        });
    };

    async verifyToken(request: Request, response: Response) {
        return response.send();
    };
};