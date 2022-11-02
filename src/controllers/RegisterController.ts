import { compare } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { RegisterRepository } from "../repositories/RegisterRepository";
import EmailService from "../service/email/EmailService";
import { hashPassword } from "../util/hashPassword";

const repository = new RegisterRepository();

export class RegisterController {
  async index(request: Request, response: Response) {
    const data = await repository.findAll();

    return response.json(data);
  };

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const passwordHash = hashPassword(password);

    const data = await repository.create({
      name_chat: name,
      email_chat: email,
      password_chat: passwordHash,
    });

    return response.json(data);
  };

  async findOne(request: Request, response: Response) {
    const { email, password } = request.body;

    const data = await repository.findOne({
        email_chat: email
    });

    const jsonStringify = JSON.stringify(data.toJSON());
    const jsonParse = JSON.parse(jsonStringify);

    const isValidPassword = await compare(password, jsonParse.password_chat);
    
    if (isValidPassword) {
        response.json({ data: "User exists!" });
    } else {
        response.status(403).json({ data: "User not exists!" });  
    };
  };

  async deleteById(request: Request, response: Response) {
    const { id_chat } = request.params;

    const data = await repository.deleteById(Number(id_chat));

    if(data) {
      response.json({ data: "Deleted!" });
    } else {
      response.status(500).json({ data: "Id not exists!" });
    };
  };

  async sendEmail(request: Request, response: Response) {
    const { name, email } = request.body;

    await EmailService.sendMail({
      name: '[Chat Bot Rocketseat]',
    }, {
      email
    }, {
      subject: 'Welcome!',
      text: `Hello ${name}. Welcome to Chat Bot Rocketseat! I hope you have fun! Thanks for the registration on chat.`,
      html: `<strong>Hello ${name}. Welcome to Chat Bot Rocketseat! I hope you have fun! Thanks for the registration on chat.</strong>`
    });

    return response.json({ email: "Email sended!" });
  };
};