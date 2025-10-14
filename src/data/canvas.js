import { Cell } from "../cell.js";

export class Canvas {

    /**
     * @type {number}
     */
    width;

    /**
     * @type {number}
     */
    height;

    /**
     * @type {Cell[]}
     */
    cells;

    /**
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.cells = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = new Cell(x, y);
                this.cells.push(cell);
            }
        }
    }

    /**
     * @param {number} x 
     * @param {number} y 
     * @param {string} color 
     */
    paint(x, y, color) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            throw Error("Out of range");
        }

        const cell = this.cells[x + y * this.width];

        cell.color = color;
    }

    toJson() {
        return {
            width: this.width,
            height: this.height,
            cells: this.cells.map((cell) => cell.toJson())
        }
    }

};