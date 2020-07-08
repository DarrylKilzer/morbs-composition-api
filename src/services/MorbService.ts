import { Sprite, SpriteCanvasHelper } from "mixel";

class MorbService {
    mask: { width: number; height: number; data: number[]; };
    colored: boolean;

    constructor() {
        this.mask = {
            width: 12,
            height: 12,
            data: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0,
                0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0,
                0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0,
                0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0,
                0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
            ]
        };
        // add to create Morb also take in optional seed
        this.colored = true;
    }
}

export const morbService: MorbService = new MorbService();