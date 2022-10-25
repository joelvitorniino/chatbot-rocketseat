import { Request, Response } from "express";
import { Chat } from "../model/Chat";

export class ChatController {
    async index() {
        const chat = await Chat.findAll();

        return chat;
    };

    async store(messageObject: any) {
        const { author, message } = messageObject;

        await Chat.create({
            message_author: author,
            message
        });
    };
}