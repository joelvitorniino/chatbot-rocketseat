import { Request, Response } from "express";
import { Chat } from "../model/Chat";
import { ChatRepository } from "../repository/ChatRepository";

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