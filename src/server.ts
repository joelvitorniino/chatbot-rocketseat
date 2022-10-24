import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import ejs from 'ejs';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(`${__dirname}../public`));
app.set('views', `${__dirname}../public`);

app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (request: Request, response: Response) => {
    response.render('index.html');
});

server.listen(3000);