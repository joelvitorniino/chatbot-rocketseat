import { IMailContent, IReceiver, ISender } from "../interface";
import nodemailer, { Transporter } from 'nodemailer';
import { config } from "dotenv";

config();

class EmailService {
    createTransporter(service: string, { user, pass }, secure: boolean): Transporter {
        return nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: pass
            },
            secure: secure
        });
    };

    async sendMail(sender: ISender, receiver: IReceiver, mailContent: IMailContent) {
        const transporter = this.createTransporter('Gmail', {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }, true);

        await transporter.sendMail({
            from: sender.name,
            to: receiver.email,
            subject: mailContent.subject,
            text: mailContent.text,
            html: mailContent.html
        });
    };
};

export default new EmailService();