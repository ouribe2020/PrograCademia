import express from 'express';
const app = express();
import cors from 'cors';
import mongoose from 'mongoose';

import {Server as SocketServer} from 'socket.io';
import http from 'http';

import config from './config.js';
const port = config().PORT;

//middleware
app.use(cors());
app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DB
const uri = config().MONGO_URI;

try {
    mongoose.connect(uri);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
}

// Routes
import router from './Routes/FormsRoute.js';
import exp from 'constants';
import { CONNREFUSED } from 'dns';
import { Socket } from 'dgram';
import { connect } from 'http2';
app.use('/', router);

//app.use(express);
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: '*',
        //methods: ['GET', 'POST']
    }
});

/*
io.on('connection', (socket) => {
    //console.log(socket.id);
    socket.on("message", (body) => {
        socket.broadcast.emit("message", {
        body,
        from: socket.id.slice(8),
        });
    });
});*/
//Chat
let usersConnected = new Map();
io.on("connection", (socket) => {
    let { id } = socket.client;
  
    socket.on("user nickname", (nickname) => {
        //  1) When the CLIENT sends the 'nickname', we store the 'nickname',
        //  'socket.client.id', and 'socket.id in a Map structure
        usersConnected.set(nickname, [socket.client.id, socket.id]);
        //  2) Send list with connected sockets
        console.log(nickname)
        io.emit("users-on", Array.from(usersConnected.keys()));
    
        //  3) Send to all other users the 'nickname' of the new socket connected
        //socket.broadcast.emit("welcome", nickname);

        socket.broadcast.emit("welcome", nickname);

        io.emit("playerName", nickname);


    });
  
    socket.on("chat message", ({ nickname, msg }) => {
        socket.broadcast.emit("chat message", { nickname, msg });
    });
  
    socket.on("chat message private", ({ toUser, nickname, msg }) => {
        let socketId = usersConnected.get(toUser)[1];
        io.to(socketId).emit("private msg", { id, nickname, msg });
    });
  
    socket.on("disconnect", () => {
        let tempUserNickname;
        // TODO: Improve this - Big O (N) - Not good if we have a lot of sockets connected
        // Find the user and remove from our data structure
        for (let key of usersConnected.keys()) {
            if (usersConnected.get(key)[0] === id) {
            tempUserNickname = key;
            usersConnected.delete(key);
            break;
            }
        }
        // Send to client the updated list with users connected
        io.emit("users-on", Array.from(usersConnected.keys()));
  
        // Send to cliente the nickname of the user that was disconnected
        socket.broadcast.emit("user-disconnected", tempUserNickname);
    });
  });


let namespace;

const trivia = [
  {
    question: 'Which is the biggest planet in the Solar System?',
    options: [
      { id: 1, description: 'Venus' },
      { id: 2, description: 'JUPITER' },
      { id: 3, description: 'Mercury' },
      { id: 4, description: 'Mars' },
    ],
  },
];


app.get('/start-game', (req, res) => {
    console.log('emiting a game!');
    const { questionNumber } = req.query;

    socket.broadcast.emit('question', {
        question: trivia[questionNumber].question,
        options: trivia[questionNumber].options,
    });
    res.json({ gameStarted: true });
});

app.get('/list', (req, res) => {
    const triviaData = {
        triviaList: [
        { id: 1, name: 'trivia1' },
        { id: 2, name: 'trivia2' },
        ],
        pin: Math.floor(Math.random() * 10),
    };
    res.json(triviaData);
});

app.get('/trivia/:pin/:selectedTrivia', (req, res) => {
    const { pin } = req.params;

    namespace = io.of(`/${pin}`);
    namespace.counter = 0;

    namespace.on('connection', (socket) => {
        namespace.counter += 1;
        if (namespace.counter === 1) {
            //console.log('Profesor conectado!');
            socket.host = true;
        }

        if (!socket.host) {
            //console.log('Estudiante conectado!');
            socket.join('gameroom');
        }

        socket.on('start-game', () => {
            namespace.emit('question', {
                question: trivia[namespace.counter].question,
                options: trivia[namespace.counter].options,
            });
        });

        socket.on('next-question', () => {
            namespace.counter += 1;
            namespace.emit('question', {
                question: trivia[namespace.counter].question,
                options: trivia[namespace.counter].options,
            });
        });

        

        // socket.on('disconnect', () => {
        //     console.log('Usuario desconectado');
        // });
    });

    res.json({ connected: true });
});





server.listen(
    port, () => {
        console.log(`Servidor ejecutado en el puerto ${port}`);
    }
);
