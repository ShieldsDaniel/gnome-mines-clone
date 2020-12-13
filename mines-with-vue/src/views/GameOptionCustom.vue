<template>
  <div class="game-option-custom">
    <form @submit.prevent="startGame()">
      <label for="number-of-columns">Columns</label>
      <br />
      <input
        type="number"
        name="number-of-columns"
        id="number-of-columns"
        min="5"
        max="40"
        v-model="numberOfColumns"
      />
      <br />
      <label for="number-of-rows">Rows</label>
      <br />
      <input
        type="number"
        name="number-of-rows"
        id="number-of-rows"
        min="5"
        max="40"
        v-model="numberOfRows"
      />
      <br />
      <label for="percent-mines">Percent Mines</label>
      <br />
      <input
        type="number"
        name="percent-mines"
        id="percent-mines"
        min="10"
        max="50"
        v-model="percentMines"
      />
      <br />
      <button type="submit">Start game</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameOptionCustom",
  data() {
    return {
      numberOfColumns: 12,
      numberOfRows: 12,
      percentMines: 20,
    };
  },
  methods: {
    startGame() {
      const mines = Math.floor(
        this.numberOfColumns * this.numberOfRows * (this.percentMines / 100)
      );
      this.$router.push({
        name: "Minesweeper",
        params: {
          columns: this.numberOfColumns,
          rows: this.numberOfRows,
          mines,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.game-option-custom {
  height: 100%;
  width: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
}
form {
  width: 300px;
}
label {
  font-size: 1.5em;
  font-weight: 300;
}
input {
  font-size: 1em;
  padding: 0.5em;
  width: 100%;
  margin-bottom: 1em;
}
button {
  font-size: 1.5em;
  padding: 0.5em;
  width: 100%;
  margin-top: 1em;
  cursor: pointer;
}
</style>