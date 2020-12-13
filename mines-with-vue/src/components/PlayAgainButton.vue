<template>
  <div class="play-again-button">
    <router-link class="btn" to="/">Play again</router-link>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
.play-again-button {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 900;
  display: grid;
  justify-content: center;
  align-content: center;
}
.btn {
  text-decoration: none;
  display: block;
  text-shadow: 10px;
  border-radius: 40px;
  /* background: rgb(148, 148, 148);
  background: linear-gradient(
    90deg,
    rgba(148, 148, 148, 1) 0%,
    rgba(219, 219, 219, 1) 100%
  ); */
  background: #eee;
  color: #222;
  font-size: 2em;
  font-weight: 900;
  padding: 0.5em 2em;
  border: 5px solid #bbb;
  box-shadow: 5px 5px 8px 4px rgba(0, 0, 0, 0.3);
}
</style>