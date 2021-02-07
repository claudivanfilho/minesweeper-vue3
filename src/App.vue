<template>
  <Game />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Game from "./components/Game.vue";

export default defineComponent({
  name: "App",
  components: {
    Game
  }
});
</script>

<style lang="scss">
.pointer-events-none {
  pointer-events: none;
}
.pointer {
  cursor: pointer;
}
</style>
