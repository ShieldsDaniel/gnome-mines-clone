<template>
  <div class="minesweeper">
    <GameDataHeader
      :numberOfFlaggedMines="numberOfFlaggedMines"
      :totalNumberOfMines="numberOfMines"
      :runTimer="gameHasStarted && !gameHasEnded"
    />
    <main class="board-container">
      <section class="game-board" :style="gridStyles">
        <Cell
          v-for="cellData in cellList"
          :key="JSON.stringify(cellData.index)"
          :cellData="cellData"
          :gameWasLost="gameWasLost"
          :cellFontSize="cellFontSize"
          @cell-left-clicked="cellLeftClickHandler"
          @cell-right-clicked="cellRightClickHandler"
        />
      </section>
      <GameWonOverlay v-if="gameHasEnded && !gameWasLost"></GameWonOverlay>
      <GameLostOverlay v-if="gameHasEnded && gameWasLost"></GameLostOverlay>
      <PlayAgainButton v-if="gameHasEnded"></PlayAgainButton>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameDataHeader from "@/components/GameDataHeader.vue";
import GameWonOverlay from "@/components/GameWonOverlay.vue";
import GameLostOverlay from "@/components/GameLostOverlay.vue";
import PlayAgainButton from "@/components/PlayAgainButton.vue";
import Cell, { CellData } from "@/components/Cell.vue";
import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { getAdjacentCellIndexList } from "@/modules/getAdjacentCellIndexList";

type MinesweeperData = {
  cellSize: number;
  cellList: CellData[];
  gameHasStarted: boolean;
  gameHasEnded: boolean;
  gameWasLost: boolean;
  cellFontSize: number;
};

export default defineComponent({
  name: "Minesweeper",
  components: {
    GameDataHeader,
    Cell,
    GameWonOverlay,
    GameLostOverlay,
    PlayAgainButton,
  },
  props: {
    columns: {
      type: String,
      required: true,
    },
    rows: {
      type: String,
      required: true,
    },
    mines: {
      type: String,
      required: true,
    },
  },
  data(): MinesweeperData {
    return {
      cellSize: 10,
      cellList: [],
      gameHasStarted: false,
      gameHasEnded: false,
      gameWasLost: false,
      cellFontSize: 0,
    };
  },
  computed: {
    numberOfColumns(): number {
      return +this.columns;
    },
    numberOfRows(): number {
      return +this.rows;
    },
    numberOfMines(): number {
      return +this.mines;
    },
    gridStyles(): Record<string, any> {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns}, ${this.cellSize}px)`,
        gridTemplateRows: `repeat(${this.numberOfRows}, ${this.cellSize}px`,
      };
    },
    numberOfFlaggedMines(): number {
      return this.cellList.reduce((sum, c) => {
        if (c.isMarkedAsMine) {
          return sum + 1;
        }
        return sum;
      }, 0);
    },
  },
  methods: {
    getAdjacentCellIndexList(position: number): number[] {
      return getAdjacentCellIndexList(
        this.numberOfColumns,
        this.numberOfRows,
        position
      );
    },
    cellListIterator(callback: (cell: CellData) => boolean): void {
      for (const cell of this.cellList) {
        if (!callback(cell)) {
          break;
        }
      }
    },
    initializeNewGame(): void {
      this.gameHasStarted = false;
      this.cellSize = this.calculateCellSize();
      this.cellFontSize = this.calculateCorrectCellFontSize(this.cellSize);
      this.cellList = this.buildCellList();
    },
    calculateCellSize(): number {
      const headerHeight = 80;
      const boardMargin = 5 * 2;
      const verticalGapOffset = (this.numberOfRows - 1) * 4;
      const horizontalGapOffset = (this.numberOfColumns - 1) * 4;
      const appWindow = document.getElementById("app") as HTMLElement;
      const bodyWidth =
        appWindow.offsetWidth - boardMargin - horizontalGapOffset;
      const bodyHeight =
        appWindow.offsetHeight - boardMargin - headerHeight - verticalGapOffset;
      const minCellWidth = bodyWidth / this.numberOfColumns;
      const minCellHeight = bodyHeight / this.numberOfRows;
      return Math.min(minCellWidth, minCellHeight);
    },
    calculateCorrectCellFontSize(cellSize: number): number {
      return Math.floor(cellSize * 0.6);
    },
    buildCellList(): CellData[] {
      const cellList: CellData[] = [];
      const cellCount = this.numberOfRows * this.numberOfColumns;
      for (let i = 0; i < cellCount; i++) {
        const xIndex = i % this.numberOfRows;
        const yIndex = Math.floor(i / this.numberOfColumns);
        cellList.push({
          position: i,
          value: 0,
          isUncovered: false,
          isMarkedAsMine: false,
        });
      }
      return cellList;
    },
    randomlySetMineField(excludedNumbers: number[]): void {
      const mineList = this.generateRandomNumbers(excludedNumbers);
      for (const minePosition of mineList) {
        this.cellList[minePosition].value = -1;
      }
    },
    generateRandomNumbers(excludedNumbers: number[]): number[] {
      const randomNumbers = new Set<number>();
      while (randomNumbers.size < this.numberOfMines) {
        const randomNumber = Math.floor(
          Math.random() * (this.cellList.length - 0) + 0
        );
        if (!excludedNumbers.includes(randomNumber)) {
          randomNumbers.add(randomNumber);
        }
      }
      return Array.from(randomNumbers);
    },
    setupCellNumbers(): void {
      this.cellListIterator((cell) => {
        if (cell.value !== -1) {
          this.cellList[cell.position].value = this.getAdjacentCellIndexList(
            cell.position
          ).reduce((adjacentMinesFound, ajdacentCellPosition) => {
            if (this.cellList[ajdacentCellPosition].value === -1) {
              return adjacentMinesFound + 1;
            }
            return adjacentMinesFound;
          }, 0);
        }
        return true;
      });
    },
    uncoverCell(position: number): void {
      if (
        !this.cellList[position].isUncovered &&
        !this.cellList[position].isMarkedAsMine
      ) {
        this.cellList[position].isUncovered = true;
        if (this.cellList[position].value === -1) {
          this.gameHasEnded = true;
          this.gameWasLost = true;
          this.getAdjacentCellIndexList;
        } else if (
          this.cellList.filter((c) => c.isUncovered).length ===
          this.cellList.length - this.numberOfMines
        ) {
          this.gameHasEnded = true;
        } else if (this.cellList[position].value === 0) {
          const adjacentCellIndexes = this.getAdjacentCellIndexList(position);
          for (let adjacentCellIndex of adjacentCellIndexes) {
            if (!this.cellList[adjacentCellIndex].isUncovered) {
              this.uncoverCell(adjacentCellIndex);
            }
          }
        }
      }
    },
    cellLeftClickHandler(cellData: CellData): void {
      if (!this.gameHasEnded) {
        if (!this.gameHasStarted) {
          const excludedNumbers = [
            cellData.position,
            ...this.getAdjacentCellIndexList(cellData.position),
          ];
          this.randomlySetMineField(excludedNumbers);
          this.setupCellNumbers();
          this.gameHasStarted = true;
        }
        if (!this.cellList[cellData.position].isUncovered) {
          this.uncoverCell(cellData.position);
        } else {
          const adjacentCellIndexes = this.getAdjacentCellIndexList(
            cellData.position
          );
          const numberofAdjacentMines = adjacentCellIndexes.reduce((sum, i) => {
            if (this.cellList[i].value === -1) {
              return sum + 1;
            }
            return sum;
          }, 0);
          const numberOfAdjacentMarkedAsMines = adjacentCellIndexes.reduce(
            (sum, i) => {
              if (this.cellList[i].isMarkedAsMine) {
                return sum + 1;
              }
              return sum;
            },
            0
          );
          if (numberofAdjacentMines === numberOfAdjacentMarkedAsMines) {
            for (let adjacentIndex of adjacentCellIndexes) {
              this.uncoverCell(adjacentIndex);
            }
          }
        }
      }
    },
    cellRightClickHandler(cellData: CellData): void {
      if (
        !this.gameHasEnded &&
        this.gameHasStarted &&
        !this.cellList[cellData.position].isUncovered
      ) {
        this.cellList[cellData.position].isMarkedAsMine = !this.cellList[
          cellData.position
        ].isMarkedAsMine;
      }
    },
  },
  mounted(): void {
    if (
      isNaN(this.numberOfColumns) ||
      isNaN(this.numberOfRows) ||
      isNaN(this.numberOfMines)
    ) {
      this.$router.push("/");
    }
    this.initializeNewGame();
  },
  beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void {
    this.initializeNewGame();
    next();
  },
});
</script>

<style lang="scss" scoped>
.minesweeper {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.board-container {
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  padding: 15px;

  .game-board {
    width: min-content;
    display: grid;
    gap: 4px;
  }
}
</style>
