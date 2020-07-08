<template>
  <div class="game container-fluid">
    <div class="row justify-content-center">
      <div class="col-11">
        <!-- EncounterModal here -->
        <div
          v-for="(row, rowIndex) in AppState.world"
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
// import { reactive } from "@vue/composition-api";
import { AppState } from "../AppState";
export default {
  name: "game",
  setup() {
    // const state = reactive({});

    function move(keyCode) {
      console.log(AppState.player.x, AppState.player.y);
      let wall;
      switch (keyCode) {
        case "KeyW":
          wall = AppState.world[AppState.player.y - 1][AppState.player.x];
          if (wall) {
            return;
          }
          AppState.player.y = AppState.player.y > 0 ? AppState.player.y - 1 : 0;
          break;
        case "KeyS":
          wall = AppState.world[AppState.player.y + 1][AppState.player.x];
          if (wall) {
            return;
          }
          AppState.player.y =
            AppState.player.y < AppState.worldHeight
              ? AppState.player.y + 1
              : AppState.worldHeight;
          break;
        case "KeyA":
          wall = AppState.world[AppState.player.y][AppState.player.x - 1];
          if (wall) {
            return;
          }
          AppState.player.x = AppState.player.x > 0 ? AppState.player.x - 1 : 0;
          break;
        case "KeyD":
          wall = AppState.world[AppState.player.y][AppState.player.x + 1];
          if (wall) {
            return;
          }
          AppState.player.x =
            AppState.player.x < AppState.worldWidth ? AppState.player.x + 1 : 0;
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

    function manageTurn(e) {
      if (AppState.enemyGorder.name) {
        return;
      }
      move(e.code);
      checkForEncounter();
    }

    document.addEventListener("keypress", manageTurn);

    return {
      // state,
      setClasses(tile, x, y) {
        let classes = "";
        if (AppState.player.x == x && AppState.player.y == y) {
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
        const xAbs = Math.abs(AppState.player.x - x);
        const yAbs = Math.abs(AppState.player.y - y);
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
