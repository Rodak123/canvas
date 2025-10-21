import { Canvas } from "./models/canvas.js";
import fs from 'fs';

const dbFile = './data.json';

export const loadCanvas = () => {
    if (!fs.existsSync(dbFile)) return null;
    const json = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    return Canvas.fromJson(json);
};

export const saveCanvas = (canvas) => {
    const json = JSON.stringify(canvas.toJson());
    fs.writeFileSync(dbFile, json, 'utf-8');
};