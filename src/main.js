import express from 'express'
import http from 'http';
import { WebSocketServer } from 'ws';
import { SocketHandler } from './socket/socketHandler.js';
import { UserController } from './controllers/userController.js';
import { CanvasController } from './controllers/canvasController.js';

const app = express();
const port = 4010;

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/socket.io/' });

const canvasController = new CanvasController();

const socketHandlers = new Set();

wss.on('connection', (ws) => {
    const socketHandler = new SocketHandler(ws);
    socketHandler.addOnCloseListener(() => {
        socketHandlers.delete(socketHandler);
    });
    socketHandlers.add(socketHandler);

    new UserController(socketHandler, canvasController);
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
