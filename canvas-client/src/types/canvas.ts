import type { Cell } from "./cell";

export interface Canvas {
    width: number,
    height: number,
    cells: Cell[]
}