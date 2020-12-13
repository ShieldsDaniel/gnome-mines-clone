import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import GameOptions from "../views/GameOptions.vue";
import GameOptionCustom from "../views/GameOptionCustom.vue";
import Minesweeper from "../views/Minesweeper.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "GameOptions",
    component: GameOptions,
  },
  {
    path: "/custom",
    name: "GameOptionCustom",
    component: GameOptionCustom,
  },
  {
    path: "/minesweeper",
    name: "Minesweeper",
    component: Minesweeper,
    props: true,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
