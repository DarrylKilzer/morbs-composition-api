import { AppState } from "@/AppState";

class MapService {
    tileSize: number = 16;
    chanceToStartAlive: number = 0.4;
    deathLimit: number = 3;
    birthLimit: number = 4;
    numberOfSteps: number = 10;
    worldWidth: number = 0;
    worldHeight: number = 0;
    newMap: number[][] = [[]];
    treasureHiddenLimit: number = 5;

    constructor() {
        this.worldWidth = Math.floor(window.outerWidth / this.tileSize);
        this.worldHeight = Math.floor(window.outerHeight / this.tileSize) - 2;
        AppState.world = this.generateMap();
        this.placeTreasure();
        const xAxis: number = Math.floor(this.worldWidth / 2);
        const yAxis: number = Math.floor(this.worldHeight / 2);
        for (let x: number = xAxis; x < AppState.world[yAxis].length; x++) {
            const wall: number = AppState.world[yAxis][x];
            if (!wall) {
                AppState.player.y = yAxis;
                AppState.player.x = x;
                x = AppState.world[yAxis].length;
            }
        }

    }
    initialiseMap(map: number[][]): number[][] {
        for (let y: number = 0; y < this.worldHeight; y++) {
            map[y] = [];
            for (let x: number = 0; x < this.worldWidth; x++) {
                map[y][x] = 0;
            }
        }
        for (let y: number = 0; y < this.worldHeight; y++) {
            for (let x: number = 0; x < this.worldWidth; x++) {
                // here we use our chanceToStartAlive variable
                if (Math.random() < this.chanceToStartAlive) {
                    // we're using numbers, not booleans, to decide if something is solid here. 0 = not solid
                    map[y][x] = 1;
                }
            }
        }
        return map;
    }
    generateMap(): number[][] {
        let map: number[][] = [[]];
        // randomly scatter solid blocks
        this.initialiseMap(map);
        for (let i: number = 0; i < this.numberOfSteps; i++) {
            // make the map more uniform by clustering live blocks
            map = this.cleanup(map);
        }
        return map;
    }

    placeTreasure(): void {
      // how hidden does a spot need to be for treasure?
      // i find 5 or 6 is good. 6 for very rare treasure.
      for (let y: number = 0; y < this.worldHeight; y++) {
        for (let x: number = 0; x < this.worldWidth; x++) {
          if (!AppState.world[y][x]) {
            const neighbors: number = this.countAliveNeighbours(AppState.world, x, y);
            if (neighbors >= this.treasureHiddenLimit) {
              AppState.world[y][x] = 2;
            }
          }
        }
      }
    }

    cleanup(map: number[][]): number[][] {
        // here's the new map we're going to copy our data into
        const newmap: number[][] = [[]];
        for (let y: number = 0; y < map.length; y++) {
            newmap[y] = [];
            for (let x: number = 0; x < map[0].length; x++) {
                // count up the neighbours
                const neighbours: number = this.countAliveNeighbours(map, x, y);
                // if the tile is currently solid
                if (map[y][x] > 0) {
                    // see if it should die
                    if (neighbours < this.deathLimit) {
                        newmap[y][x] = 0;
                    } else {
                        newmap[y][x] = 1;
                    }
                } else {
                    // see if it should become solid
                    if (neighbours > this.birthLimit) {
                        newmap[y][x] = 1;
                    } else {
                        newmap[y][x] = 0;
                    }
                }
            }
        }
        return newmap;
    }

    countAliveNeighbours(map: number[][], x: number, y: number): number {
        let count: number = 0;
        for (let i: number = -1; i < 2; i++) {
            for (let j: number = -1; j < 2; j++) {
                const neighborY: number = i + y;
                const neighborX: number = j + x;
                // if (i == 0 && j == 0) {
                // }
                // if it's at the edges, consider it to be solid (you can try removing the count = count + 1)
                if (
                    neighborX < 0 ||
                    neighborY < 0 ||
                    neighborX >= map[0].length ||
                    neighborY >= map.length
                ) {
                    count++;
                } else if (map[neighborY][neighborX] === 1) {
                    count++;
                }
            }
        }
        return count;
    }
}

export const mapService: MapService = new MapService();