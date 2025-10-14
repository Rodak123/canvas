import express from 'express'
import http from 'http';
import { WebSocketServer } from 'ws';
import { SocketHandler } from './socket/socketHandler.js';

const app = express();
const port = 4010;

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/socket.io/' });

const socketHandlers = new Set();

wss.on('connection', (ws) => {
    const socketHandler = new SocketHandler(ws);
    socketHandler.addOnCloseListener(() => {
        socketHandlers.delete(socketHandler);
    });
    socketHandlers.add(socketHandler);

    socketHandler.addOnMessageListener((value) => {
        console.log(value);
    });
});


server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
