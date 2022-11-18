import { IMailContent, IReceiver, ISender, ITransporter } from "../interface";
import nodemailer, { Transporter } from 'nodemailer';
import { config } from "dotenv";
import hbs from "nodemailer-express-handlebars";

config();

class EmailService {
    createTransporter(config: ITransporter): Transporter {
        return nodemailer.createTransport(config);
    };

    async sendMail(sender: ISender, receiver: IReceiver, mailContent: IMailContent): Promise<void> {
        const transporter = this.createTransporter({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
            secure: true
        });

        await transporter.sendMail({
            from: sender.name,
            to: receiver.email,
            subject: mailContent.subject,
            text: mailContent.text,
            html: mailContent.html
        });
    };

    async forgotPassword() {
        const transporter = this.createTransporter({
            service: 'Gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            },
            secure: true
        });

        const handlebarOptions = {
            viewEngine: {
                extName: '.html',
                partialsDir: `${__dirname}/../resources/mail`,
                layoutsDir: `${__dirname}/../resources/mail`
            },
            viewPath: `${__dirname}/../resources/mail`,
            extName: '.html'
        }

        transporter.use('compile', hbs(handlebarOptions));
    };
};

export default new EmailService();