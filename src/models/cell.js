export class Cell {

    static fromJson(json) {
        const cell = new Cell(json.x, json.y);
        cell.color = json.color ?? '#0f0e11';
        return cell;
    }

    /**
     * @type {number}
     */
    x;

    /**
     * @type {number}
     */
    y;

    /**
     * @type {string}
     */
    color;

    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = `#0f0e11`;
    }

    toJson() {
        return {
            x: this.x,
            y: this.y,
            color: this.color
        };
    }

}