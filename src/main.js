import express from 'express'
import http from 'http';
import { WebSocketServer } from 'ws';
import { SocketHandler } from './socket/socketHandler.js';
import { UserController } from './controllers/userController.js';
import { CanvasController } from './controllers/canvasController.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/socket.io/' });

app.use('/', express.static('canvas-client/dist'));

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
