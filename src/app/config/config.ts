import { config } from "dotenv";
import { StrategyOptionsWithRequest } from "passport-google-oauth2";

config();

export const configAuth: StrategyOptionsWithRequest = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_KEY_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true
};