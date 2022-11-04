import { Readable } from "nodemailer/lib/xoauth2";

export interface IMailContent {
    subject: string;
    text: string;
    html: string | Buffer | Readable;
};