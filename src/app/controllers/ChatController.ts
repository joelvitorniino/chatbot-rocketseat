import { Request, Response } from "express";
import { ChatRepository } from "../repositories/ChatRepository";
import { RegisterRepository } from "../repositories/RegisterRepository";
import { AuthController } from "./AuthController";

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

    async verifyAuthor(request: Request, response: Response) {
        const repositoryRegister: RegisterRepository = new RegisterRepository();
        
        const { author } = request.body;
        const user = await repositoryRegister.findByName({
            name_chat: author
        });

        if(user) {
            return response.send();
        };

        return response.status(404).send();
    };
};