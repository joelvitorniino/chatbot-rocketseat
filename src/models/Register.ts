import { DataTypes } from "sequelize";
import { db } from "../db/db";

export const Register = db.define('register', {
    id_chat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name_chat: DataTypes.STRING,
    email_chat: DataTypes.STRING,
    password_chat: DataTypes.STRING
}, {
    tableName: 'register',
    freezeTableName: true,
    timestamps: false
});