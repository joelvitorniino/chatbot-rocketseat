import { IMailContent, IReceiver, ISender } from "../interface";
import nodemailer, { Transporter } from 'nodemailer';
import { config } from "dotenv";

config();

class EmailService {
    createTransporter(service: string, { user, pass }, secure: boolean): Transporter {
        return nodemailer.createTransport({
            service,
            auth: {
                user,
                pass
            },
            secure
        });
    };

    async sendMail(sender: ISender, receiver: IReceiver, mailContent: IMailContent) {
        const transporter = this.createTransporter('Gmail', {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD
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