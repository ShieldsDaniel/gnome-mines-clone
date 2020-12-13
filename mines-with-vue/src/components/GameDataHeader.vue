<template>
  <header class="game-data-header">
    <div class="header-items">
      <div>
        <i class="fa fa-flag"></i>
        <span>{{ numberOfFlaggedMines }}/{{ totalNumberOfMines }}</span>
      </div>
      <div>
        <i class="fa fa-clock"></i>
        <span>{{ timeElapsed }}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameDataHeader",
  props: {
    numberOfFlaggedMines: {
      type: Number,
      default: 0,
    },
    totalNumberOfMines: {
      type: Number,
      default: 0,
    },
    runTimer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      seconds: 0,
      minutes: 0,
    };
  },
  computed: {
    timeElapsed(): string {
      let seconds = this.seconds.toString();
      let minutes = this.minutes.toString();
      if (this.seconds < 10) {
        seconds = `0${seconds}`;
      }
      if (this.minutes < 10) {
        minutes = `0${minutes}`;
      }
      return `${minutes}:${seconds}`;
    },
  },
  methods: {
    timerTick(): void {
      if (this.runTimer) {
        if (this.seconds === 59) {
          this.seconds = 0;
          this.minutes = this.minutes + 1;
        } else {
          this.seconds = this.seconds + 1;
        }
      }
    },
  },
  mounted() {
    setInterval(this.timerTick, 1000);
  },
});
</script>

<style lang="scss" scoped>
.game-data-header {
  background: #444;
  color: #eee;
  display: grid;
  justify-content: center;
  align-content: center;
  padding: 15px;
}
.header-items {
  display: flex;
  font-size: 1.5em;
  font-weight: bold;

  i {
    margin-right: 0.5em;
  }

  & > div:first-child {
    margin-right: 0.75em;
  }
  & > div:last-child {
    margin-left: 0.75em;
  }
}
</style>