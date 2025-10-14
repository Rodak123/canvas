import { Canvas } from "../data/canvas.js";

export class CanvasController {

    /**
     * @type {Canvas}
     */
    _canvas;

    /**
     * @type {()=>void[]}
     */
    _canvasUpdatedListeners = [];

    constructor() {
        this._canvas = new Canvas(64, 64);
    }

    /**
     * @type {Canvas}
     */
    get canvas() {
        return this._canvas;
    }

    /**
     * @param {()=>void} listener 
     */
    addCanvasUpdatedListenter(listener) {
        this._canvasUpdatedListeners.push(listener);
    }

    _invokeCanvasUpdated() {
        this._canvasUpdatedListeners.forEach(listener => {
            listener();
        });
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {string} color 
     */
    paint(x, y, color) {
        this._canvas.paint(x, y, color);
        this._invokeCanvasUpdated();
    }

}