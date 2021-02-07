<template>
  <div class="flex flex-column justify-center">
    <div class="game__emoji-wrapper flex justify-center">
      <EmojiBlock :state="gameState" @click="onReset" class="pointer" />
    </div>
    <div class="game__field-wrapper flex justify-center">
      <MineField
        :minesQuantity="6"
        :size="10"
        @complete="onComplete"
        @lost="onLost"
        :state="gameState"
        :class="(isComplete && 'pointer-events-none') || ''"
      />
    </div>
    <div v-if="isComplete" class="flex justify-center">
      <h2>Congratulations!</h2>
    </div>
    <div v-else-if="isLost" class="flex justify-center">
      <h2>You lose!</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { GameState } from "@/models";
import EmojiBlock from "./EmojiBlock.vue";
import MineField from "./MineField.vue";

export default defineComponent({
  name: "Game",
  components: {
    EmojiBlock,
    MineField
  },
  data() {
    return {
      gameState: GameState.RUNNING
    };
  },
  methods: {
    onComplete() {
      this.gameState = GameState.COMPLETED;
    },
    onReset() {
      this.gameState = GameState.RUNNING;
    },
    onLost() {
      this.gameState = GameState.LOST;
    }
  },
  computed: {
    isComplete(): boolean {
      return this.gameState === GameState.COMPLETED;
    },
    isLost(): boolean {
      return this.gameState === GameState.LOST;
    }
  }
});
</script>

<style lang="scss">
.game__field-wrapper {
  margin-top: 10px;
}
</style>
