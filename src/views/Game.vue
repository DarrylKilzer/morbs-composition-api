<template>
  <div class="game container-fluid">
    <div class="row justify-content-center">
      <div class="col-11">
        <!-- EncounterModal here -->
        <div
          v-for="(row, rowIndex) in state.world"
          class="map-row mx-auto"
          :key="rowIndex"
        >
          <div
            v-for="(tile, columnIndex) in row"
            class="map-column"
            :class="setClasses(tile, columnIndex, rowIndex)"
            :key="rowIndex + columnIndex"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "game",
  setup() {
    const state = reactive({
      player: {
        x: 0,
        y: 0
      },
      tileSize: 16,
      chanceToStartAlive: 0.4,
      deathLimit: 3,
      birthLimit: 4,
      numberOfSteps: 10,
      worldWidth: 0,
      worldHeight: 0,
      world: [[]],
      newMap: [[]],
      treasureHiddenLimit: 5
    });

    //#region functions

    function initialiseMap(map) {
      for (let y = 0; y < state.worldHeight; y++) {
        map[y] = [];
        for (let x = 0; x < state.worldWidth; x++) {
          map[y][x] = 0;
        }
      }
      for (let y = 0; y < state.worldHeight; y++) {
        for (let x = 0; x < state.worldWidth; x++) {
          //Here we use our chanceToStartAlive variable
          if (Math.random() < state.chanceToStartAlive)
            //We're using numbers, not booleans, to decide if something is solid here. 0 = not solid
            map[y][x] = 1;
        }
      }
      return map;
    }

    function countAliveNeighbours(map, x, y) {
      let count = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const neighborY = i + y;
          const neighborX = j + x;
          // if (i == 0 && j == 0) {
          // }
          //If it's at the edges, consider it to be solid (you can try removing the count = count + 1)
          if (
            neighborX < 0 ||
            neighborY < 0 ||
            neighborX >= map[0].length ||
            neighborY >= map.length
          ) {
            count++;
          } else if (map[neighborY][neighborX] == 1) {
            count++;
          }
        }
      }
      return count;
    }

    function cleanup(map) {
      //Here's the new map we're going to copy our data into
      const newmap = [[]];
      for (let y = 0; y < map.length; y++) {
        newmap[y] = [];
        for (let x = 0; x < map[0].length; x++) {
          //Count up the neighbours
          const neighbours = countAliveNeighbours(map, x, y);
          //If the tile is currently solid
          if (map[y][x] > 0) {
            //See if it should die
            if (neighbours < state.deathLimit) {
              newmap[y][x] = 0;
            }
            //Otherwise keep it solid
            else {
              newmap[y][x] = 1;
            }
          }
          //If the tile is currently empty
          else {
            //See if it should become solid
            if (neighbours > state.birthLimit) {
              newmap[y][x] = 1;
            } else {
              newmap[y][x] = 0;
            }
          }
        }
      }
      return newmap;
    }

    function generateMap() {
      let map = [[]];
      //randomly scatter solid blocks
      initialiseMap(map);
      for (let i = 0; i < state.numberOfSteps; i++) {
        // make the map more uniform by clustering live blocks
        map = cleanup(map);
      }
      return map;
    }

    function move(keyCode) {
      console.log(state.player.x, state.player.y);
      let wall;
      switch (keyCode) {
        case "KeyW":
          wall = state.world[state.player.y - 1][state.player.x];
          if (wall) {
            return;
          }
          state.player.y = state.player.y > 0 ? state.player.y - 1 : 0;
          break;
        case "KeyS":
          wall = state.world[state.player.y + 1][state.player.x];
          if (wall) {
            return;
          }
          state.player.y =
            state.player.y < state.worldHeight
              ? state.player.y + 1
              : state.worldHeight;
          break;
        case "KeyA":
          wall = state.world[state.player.y][state.player.x - 1];
          if (wall) {
            return;
          }
          state.player.x = state.player.x > 0 ? state.player.x - 1 : 0;
          break;
        case "KeyD":
          wall = state.world[state.player.y][state.player.x + 1];
          if (wall) {
            return;
          }
          state.player.x =
            state.player.x < state.worldWidth ? state.player.x + 1 : 0;
          break;
      }
    }

    function checkForEncounter() {
      if (Math.random() > 0.99) {
        // call to service
        // this.$store.dispatch("createWildGorder");
        // eslint-disable-next-line no-undef
        $("#encounter-modal").modal("toggle");
      }
    }

    function placeTreasure() {
      //How hidden does a spot need to be for treasure?
      //I find 5 or 6 is good. 6 for very rare treasure.
      for (let y = 0; y < state.worldHeight; y++) {
        for (let x = 0; x < state.worldWidth; x++) {
          if (!state.world[y][x]) {
            const nbs = countAliveNeighbours(state.world, x, y);
            if (nbs >= state.treasureHiddenLimit) {
              state.world[y][x] = 2;
            }
          }
        }
      }
    }

    function manageTurn(e) {
      if (state.enemyGorder.name) {
        return;
      }
      move(e.code);
      checkForEncounter();
    }
    //#endregion

    state.worldWidth = Math.floor(window.outerWidth / state.tileSize);
    state.worldHeight = Math.floor(window.outerHeight / state.tileSize) - 2;
    state.world = generateMap();
    placeTreasure();
    const xAxis = Math.floor(state.worldWidth / 2);
    const yAxis = Math.floor(state.worldHeight / 2);
    for (let x = xAxis; x < state.world[yAxis].length; x++) {
      const wall = state.world[yAxis][x];
      if (!wall) {
        state.player.y = yAxis;
        state.player.x = x;
        x = state.world[yAxis].length;
      }
    }

    document.addEventListener("keypress", manageTurn);

    return {
      state,
      generateMap,
      setClasses(tile, x, y) {
        let classes = "";
        if (state.player.x == x && state.player.y == y) {
          classes += "player";
          return classes;
        }
        if (tile == 1) {
          classes += "wall";
          return classes;
        } else if (tile == 2) {
          classes += "treasure";
        } else {
          classes += "floor";
        }
        const xAbs = Math.abs(state.player.x - x);
        const yAbs = Math.abs(state.player.y - y);
        const tooFar = xAbs + yAbs > 4;
        classes += tooFar ? " fog" : "";
        return classes;
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.game {
  flex: 1;
}

.map-row {
  height: 16px;
}

.map-column {
  height: 16px;
  width: 16px;
  display: inline-block;
}

.treasure {
  background-color: goldenrod;
}

.fog {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.wall {
  background-color: black;
}

.floor {
  background-color: darkslategrey;
}
.player {
  background-color: blue !important;
}
</style>
