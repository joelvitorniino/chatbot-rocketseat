import { Request, Response } from "express";
import { RegisterRepository } from "../repositories/RegisterRepository";

const repository = new RegisterRepository();

export class RegisterController {

    async index(request: Request, response: Response) {
        const data = await repository.findAll();

        return response.json(data);
    };

    async store(request: Request, response: Response) {
        const { name, email, password } = request.body;
        const data = await repository.create({
            name_chat: name,
            email_chat: email,
            password_chat: password
        });

        return response.json(data);
    };
};