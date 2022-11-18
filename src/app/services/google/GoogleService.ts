import { VerifyCallback, VerifyFunctionWithRequest, Strategy } from "passport-google-oauth2";
import { Request } from 'express';
import { RegisterRepository } from "../../repositories/RegisterRepository";
import passport, { PassportStatic } from "passport";
import { configAuth } from "../../config/config";

const repository = new RegisterRepository();

export class GoogleService {
    async callback(request: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<VerifyFunctionWithRequest | void> {
        const { name, email } = profile;

        await repository.create({
            name_chat: name,
            email_chat: email,
            password_chat: null
        });

        return done(null, profile);
    };

    createPassport(): PassportStatic {
        const passportGoogle = passport.use(new Strategy(configAuth, this.callback));

        return passportGoogle;
    };

    serializeUser() {
        const passport = this.createPassport();

        passport.serializeUser((user, done) => {
            done(null, user);
        });
    };

    deserializeUser() {
        const passport = this.createPassport();

        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    }
};