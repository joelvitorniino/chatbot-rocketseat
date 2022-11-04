import { compare } from "bcryptjs";
import { config } from "dotenv";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { RegisterRepository } from "../repositories/RegisterRepository";
import crypto from 'crypto';
import EmailService from "../service/email/EmailService";
import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import { hashPassword } from "../util/hashPassword";

config();

const repository = new RegisterRepository();

export class AuthController {
    async authenticate(request: Request, response: Response) {
        const { email, password } = request.body;

        const user = await repository.findOne({
            email_chat: email,
        });

        if(!user) {
            return response.sendStatus(401);
        };

        const jsonStringify = JSON.stringify(user.toJSON());
        const jsonParse = JSON.parse(jsonStringify);

        const isValidPassword = await compare(password, jsonParse.password_chat);

        console.log(user);

        if(!isValidPassword) {
            return response.sendStatus(401);
        };

        const token = sign({ id: jsonParse.id_chat }, process.env.TOKEN, { expiresIn: '1d' });

        delete jsonParse.password_chat;

        return response.json({
            jsonParse,
            token
        })
    };

    async forgotPassword(request: Request, response: Response) {
        const { email } = request.body;
        
        try {
            const user = await repository.findOne({ email_chat: email });

            if(!user) {
                return response.status(400).send({ error: 'User not found' });
            };

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            const userJSON = user.toJSON();

            await repository.findByIdAndUpdate(userJSON.id_chat, {
                password_chat_resetToken: token,
                password_chat_resetExpires: now.toDateString(),
            });

            const template = handlebars.compile(readFileSync(`${__dirname}/../service/resources/mail/forgot_password.html`, 'utf8'));
            const htmlToSend = template({ token });

            EmailService.sendMail({
                name: 'Forgot Password'
            }, {
                email,
            }, {
                html: htmlToSend,
                text: null,
                subject: 'Forgot Password'
            })
            .catch(err => {
                if(err) {
                    return response.status(400).send({ error: 'Cannot send forgot password email' });
                }
            })
            .then(() => response.send());
        } catch(err) {
            response.status(400).send({ error: err});
        };
    };

    async resetPassword(request: Request, response: Response) {
        const { email, token, password } = request.body;
        
        try {
            const user = await repository.findOne({ email_chat: email });
            const userJSON = user.toJSON();

            if(!user) {
                return response.status(400).send({ error: "User not found!" });
            };

            if(token !== userJSON.password_chat_resetToken) {
                return response.status(400).send({ error: 'Token invalid' });
            };

            const now = new Date();

            if(now > userJSON.password_chat_resetExpires) {
                return response.status(400).send({ error: 'Token expired, generate a now one' });
            };

            await user.update({
                password_chat: hashPassword(password)
            }, { where: { email } });

            await user.save();

            response.send();
        } catch(err) {
            response.status(400).send({ error: 'Cannot reset password, try again' });
        }
    }
};