import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import ejs from "ejs";
import { ChatController } from "./controllers/ChatController";
import routes from "./routes";
import { GoogleService } from "./services/google/GoogleService";
import session from "express-session";
import { config } from "dotenv";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const passport = new GoogleService().createPassport();

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../public`));
const makeDirName = (path: string) => `${__dirname}/${path}`;

const views = [
  makeDirName(`../public/home`),
  makeDirName(`../public/auth_google`),
  makeDirName('../public/forgot'),
  makeDirName('../public/reset_password'),
  makeDirName(`../public/register`),
  makeDirName(`../public/chat`)
];

app.set("views", views);

app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.get("/", (request: Request, response: Response) => {
    response.render("home.html");
});

app.get('/auth_google', (request: Request, response: Response) => {
    response.render("auth_google.html");
});

app.get("/forgot", (request: Request, response: Response) => {
  response.render("forgot.html");
});

app.get("/reset_password", (request: Request, response: Response) => {
  response.render("reset_password.html");
});

app.get("/register", (request: Request, response: Response) => {
    response.render("register.html");
});

app.get("/chat", (request: Request, response: Response) => {
    response.render("chat.html");
});

app.use(session({ secret: process.env.TOKEN }))
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const googleService = new GoogleService();

googleService.serializeUser();
googleService.deserializeUser();

io.on("connection", async (socket) => {
  console.log(`Socket conectado ${socket.id}`);

  const chatController = new ChatController();

  const chatIndex = await chatController.index();
  const jsonStringify = JSON.stringify(chatIndex.map((data) => data.toJSON()));
  const jsonParse = JSON.parse(jsonStringify);

  let messages;

  jsonParse.forEach((data) => {
    messages = [
      {
        author: data.message_author,
        message: data.message,
      },
    ];

    socket.emit("previousMessages", messages);
  });

  socket.on("sendMessage", async ({ author, message }) => {
    await chatController.store({ author, message });
    socket.broadcast.emit("receivedMessage", { author, message });
  });
});

server.listen(process.env.PORT || 3000);