export interface ITransporter {
    service: string;
    auth: {
        user: string,
        pass: string
    },
    secure: boolean;
};