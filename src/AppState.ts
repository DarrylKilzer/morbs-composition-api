import Vue from "vue";
import { Morb } from "./models";
import VueCompositionApi from "@vue/composition-api";
Vue.use(VueCompositionApi);

import { reactive } from "@vue/composition-api";

interface IOptionsObj {
    world: number[][];
    enemyMorb: Morb;
}

export const AppState: IOptionsObj = reactive({
    world: [[]],
    enemyMorb: {}
});

