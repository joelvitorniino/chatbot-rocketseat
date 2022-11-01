import { compare } from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { RegisterRepository } from "../repositories/RegisterRepository";
import { hashPassword } from "../util/hashPassword";

config();

export class AuthController {
    async authenticate(request: Request, response: Response) {
        const repository = new RegisterRepository();
        const { email, password } = request.body;

        const passwordHash = hashPassword(password);

        const user = await repository.findOne({
            email_chat: email,
            password_chat: passwordHash
        });

        if(!user) {
            return response.sendStatus(401);
        };

        const jsonStringify = JSON.stringify(user.toJSON());
        const jsonParse = JSON.parse(jsonStringify);

        const isValidPassword = await compare(password, jsonParse.password_chat);

        if(!isValidPassword) {
            return response.sendStatus(401);
        };

        const token = sign({ id_chat: jsonParse.id_chat }, process.env.TOKEN, { expiresIn: '1d' });

        delete jsonParse.password_chat;

        return response.json({
            jsonParse,
            token
        })
    };
};