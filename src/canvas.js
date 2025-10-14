import { Cell } from "./cell.js";

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
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const cell = new Cell(x, y);
                this.cells.push(cell);
            }
        }
    }

    toJson() {
        return {
            width: this.width,
            height: this.height,
            cells: this.cells.map((cell) => cell.toJson())
        }
    }

};