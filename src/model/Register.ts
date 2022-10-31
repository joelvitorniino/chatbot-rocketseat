import { DataTypes } from "sequelize";
import { db } from "../db/db";

export const Register = db.define('register', {
    id_chat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    email_chat: DataTypes.STRING,
    password: DataTypes.STRING
});