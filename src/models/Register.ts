import { DataTypes } from "sequelize";
import { db } from "../db/db";

export const Register = db.define('register', {
    id_chat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name_chat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email_chat: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password_chat: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password_chat_resetToken: DataTypes.STRING,
    password_chat_resetExpires: DataTypes.STRING
}, {
    tableName: 'register',
    freezeTableName: true,
    timestamps: false
});