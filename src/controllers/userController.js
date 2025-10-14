import { CLIENT_ACTIONS, SERVER_ACTIONS } from "../../shared/socketAction.js";
import { SocketHandler } from "../socket/socketHandler.js";
import { CanvasController } from "./canvasController.js";

export class UserController {

    /**
     * @type {SocketHandler}
     */
    _socketHandler;

    /**
     * @type {CanvasController}
     */
    _canvasController;

    /**
     * @param {SocketHandler} socketHandler 
     * @param {CanvasController} canvasController
     */
    constructor(socketHandler, canvasController) {
        this._socketHandler = socketHandler;
        this._canvasController = canvasController;

        canvasController.addCanvasUpdatedListenter(() => {
            this._sendCanvasUpdate();
        });

        socketHandler.addOnMessageListener((value) => {
            switch (value.action) {
                case CLIENT_ACTIONS.PAINT_CELL:
                    const { x, y, color } = value.data;
                    this._canvasController.paint(x, y, color);
                    break;
                default:
                    console.log('unknown action:', value.action);
                    break;
            }
        });

        this._sendCanvasUpdate();
    }

    _sendCanvasUpdate() {
        this._socketHandler.sendJSON({
            action: SERVER_ACTIONS.UPDATED_CANVAS,
            data: this._canvasController.canvas.toJson()
        });
    }

}