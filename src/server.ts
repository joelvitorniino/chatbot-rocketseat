import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ejs from 'ejs';
import { ChatController } from './controllers/ChatController';
import routes from './routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../public`));
app.set('views', `${__dirname}/../public`);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.static(`${__dirname}/../public/home`));
app.get('/home', (request: Request, response: Response) => {
    response.render('/home');
});

app.use(express.static(`${__dirname}/../public/register`));
app.get('/register', (request: Request, response: Response) => {
    response.render('/register');
});

// app.get('/chat', (request: Request, response: Response) => {
//     response.render('/chat');
// });


app.use(routes);

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