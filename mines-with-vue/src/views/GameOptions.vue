<template>
  <div class="game-options">
    <nav>
      <ul>
        <li v-for="(option, index) in options" :key="index">
          <router-link :to="option.route" v-if="option.custom">
            <div class="option-title">Custom</div>
          </router-link>
          <router-link :to="option.route" v-else>
            <div class="option-title">
              {{ option.route.params.columns }} x
              {{ option.route.params.rows }}
              <br />
              {{ option.route.params.mines }} Mines
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameOptions",
  components: {},
  data() {
    return {
      options: [
        {
          route: {
            name: "Minesweeper",
            params: {
              columns: 8,
              rows: 8,
              mines: 10,
            },
          },
          custom: false,
        },
        {
          route: {
            name: "Minesweeper",
            params: {
              columns: 16,
              rows: 16,
              mines: 24,
            },
          },
          custom: false,
        },
        {
          route: {
            name: "Minesweeper",
            params: {
              columns: 30,
              rows: 30,
              mines: 50,
            },
          },
          custom: false,
        },
        {
          route: { name: "GameOptionCustom" },
          custom: true,
        },
      ],
    };
  },
});
</script>

<style lang="scss">
.game-options {
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100vh;
  nav {
    width: 70vw;
    height: 90vh;
    max-width: 800px;
    ul {
      height: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 50% 50%;
      gap: 5px;
      margin: 0;
      padding: 0;
      list-style: none;
      .option-title {
        font-style: none;
        color: #222;
        text-decoration: none !important;
        font-size: 28px;
        line-height: 40px;
      }
      li div {
        height: 100%;
        width: 100%;
        display: grid;
        justify-content: center;
        align-content: center;
        background: #eee;
        border-radius: 10px;
        text-align: center;
      }
    }
  }
}
</style>
