import Vue from "vue";
import { Morb, Player } from "./models";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { reactive } from "@vue/composition-api";

interface IOptionsObj {
    world: number[][];
    enemyMorb: Morb;
    player: Player;
}

export const AppState: IOptionsObj = reactive({
    world: [[]],
    enemyMorb: {},
    player: new Player()
});

