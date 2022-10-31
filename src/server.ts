import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ejs from 'ejs';
import { ChatController } from './controllers/ChatController';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(`${__dirname}/../public`));
app.set('views', `${__dirname}/../public`);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (request: Request, response: Response) => {
    response.render('index.html');
});

io.on('connection', async socket => {
    console.log(`Socket conectado ${socket.id}`);

    const chatController = new ChatController();

    const chatIndex = await chatController.index();
    const jsonStringify = JSON.stringify(chatIndex.map(data => data.toJSON()));
    const jsonParse = JSON.parse(jsonStringify);

    let messages;

    jsonParse.forEach(data => {
        messages = [
            {
                author: data.message_author,
                message: data.message
            }
        ]

        socket.emit("previousMessages", messages);
    });

    socket.on('sendMessage', async data => {
        await chatController.store(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);