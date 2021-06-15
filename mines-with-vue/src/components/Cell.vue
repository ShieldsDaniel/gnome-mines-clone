<template>
  <div
    class="cell"
    :style="{ ...cellBackgroundStyle, ...cellFontSizeStyle }"
    @click="leftClickHandler()"
    @contextmenu.prevent="rightClickHandler()"
  >
    <div
      class="show-mines-on-loss"
      v-if="gameWasLost && !cellData.isUncovered && cellData.value === -1"
    >
      <span>
        <i class="fas fa-sun"></i>
      </span>
    </div>
    <div class="value" v-else-if="cellData.isUncovered">
      <span v-if="cellData.value === -1">
        <i class="mine fas fa-bahai"></i>
      </span>
      <span v-else-if="cellData.value !== 0" :class="colorClass">
        {{ cellData.value }}
      </span>
    </div>
    <div v-else-if="cellData.isMarkedAsMine">
      <i class="flag fas fa-flag"></i>
    </div>
    <div v-else></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export type CellIndex = [number, number];
export type CellData = {
  position: number;
  value: number;
  isUncovered: boolean;
  isMarkedAsMine: boolean;
};

export default defineComponent({
  name: "Cell",
  props: {
    cellData: {
      type: Object,
      required: true,
    },
    gameWasLost: {
      type: Boolean,
      required: true,
    },
    cellFontSize: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    cellBackgroundStyle(): Record<string, any> {
      if (
        this.gameWasLost &&
        this.cellData.value === -1 &&
        !this.cellData.isUncovered
      ) {
        return { background: "#aaaaaa" };
      } else if (this.cellData.isUncovered) {
        return { background: "#eaeaea" };
      } else {
        return { background: "#cccccc" };
      }
    },
    cellFontSizeStyle(): Record<string, any> {
      return { fontSize: `${this.cellFontSize}px` };
    },
    colorClass(): string {
      return `number number-${this.cellData.value}`;
    },
  },
  methods: {
    leftClickHandler(): void {
      this.$emit("cell-left-clicked", this.cellData);
    },
    rightClickHandler(): void {
      this.$emit("cell-right-clicked", this.cellData);
    },
  },
});
</script>

<style lang="scss" scoped>
.cell {
  border-radius: 4px;
  padding: 0.25em;
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-content: center;
}
.flag {
  color: #222;
}
.mine {
  color: orangered;
}
.number {
  font-weight: 900;
}
.number-1 {
  color: blue;
}
.number-2 {
  color: green;
}
.number-3 {
  color: darkblue;
}
.number-4 {
  color: darkred;
}
.number-5 {
  color: orange;
}
.number-6 {
  color: red;
}
</style>
