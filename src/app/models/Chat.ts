import { db } from "../db/db";
import { DataTypes } from 'sequelize';

export const Chat = db.define('messages', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message_author: DataTypes.STRING,
    message: DataTypes.STRING
}, {
    timestamps: false,
});