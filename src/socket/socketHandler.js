
class SocketHandler {

    /**
     * @type {WebSocket}
     */
    _ws;

    /**
     * @type {(()=>void)[]}
     */
    _onCloseListeners = [];

    /**
     * @type {((value: object)=>void)[]}
     */
    _onMessageListeners = [];

    /**
     * @param {WebSocket} ws
     */
    constructor(ws) {
        this._ws = ws;

        this._ws.on('message', (message) => this._onMessage(message));

        this._ws.on('close', () => this._onClose());

        this._ws.on('error', (error) => {
            console.error(error);
            this._onClose();
        });
    }

    /**
     * @param {()=>void} event 
     */
    addOnCloseListener(event) {
        this._onCloseListeners.push(event);
    }

    /**
     * @param {(value: object)=>void} event 
     */
    addOnMessageListener(event) {
        this._onMessageListeners.push(event);
    }

    /**
     * @param {object} value 
     */
    sendJSON(value) {
        this._ws.send(JSON.stringify(value));
    }

    /**
     * @param {Buffer} buffer 
     */
    _onMessage(buffer) {
        const message = buffer.toString();
        let value = null;
        try {
            value = JSON.parse(message);
        } catch {
            console.error(`Failed to parse message: ${message}`);
            return;
        }
        this._onMessageListeners.forEach((event) => event?.call(this, value));
    }

    _onClose() {
        console.log('Disconnected');

        this._onCloseListeners.forEach((event) => event?.call());
    }

}

export { SocketHandler };