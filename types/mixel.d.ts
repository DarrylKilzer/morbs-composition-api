export class Sprite {
    static hslToRgb(h: any, s: any, l: any): any;
    constructor(mask: any, opts: any);
    mask: any;
    data: any;
    imageData: any;
    spriteOpts: any;
    rng: any;
    applyMask(): void;
    calculateColors(): void;
    generateEdges(): void;
    generateRandomSample(): void;
    getData(x: any, y: any): any;
    init(): void;
    mirrorX(): void;
    mirrorY(): void;
    setData(x: any, y: any, value: any): void;
}
export class SpriteCanvasHelper {
    static createCanvas(sprite: any): any;
    static resizeCanvas(canvas: any, scaleFactor: any): any;
}
export const SpriteStructure: {
    "-1": string;
    "0": string;
    "1": string;
    "2": string;
    AB: number;
    AlwaysBorder: number;
    BB: number;
    EB: number;
    EP: number;
    Empty: number;
    RandomlyBorderBody: number;
    RandomlyEmptyBody: number;
};
