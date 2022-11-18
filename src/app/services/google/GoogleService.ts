import { VerifyCallback, VerifyFunctionWithRequest, Strategy } from "passport-google-oauth2";
import { Request } from 'express';
import { RegisterRepository } from "../../repositories/RegisterRepository";
import passport, { PassportStatic } from "passport";
import { configAuth } from "../../config/config";

const repository = new RegisterRepository();

export class GoogleService {
    async callback(request: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<VerifyFunctionWithRequest | void> {
        const { name, email } = profile;
        const { givenName, familyName } = name;

        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
        }

        const user = await repository.findOne({ email_chat: email });

        if(!user) {
            await repository.create({
                name_chat: `${givenName} ${familyName}`,
                email_chat: email,
                password_chat: password
            });
        };

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