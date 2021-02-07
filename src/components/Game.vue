<template>
  <div class="game__wrapper">
    <div class="game__emoji-wrapper">
      <EmojiBlock :state="gameState" @click="onReset" class="pointer" />
    </div>
    <div class="game__field-wrapper">
      <MineField
        :minesQuantity="6"
        :size="10"
        @complete="onComplete"
        @lost="onLost"
        :state="gameState"
        :class="(isComplete && 'pointer-events-none') || ''"
      />
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
    }
  }
});
</script>

<style lang="scss">
.game__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.game__emoji-wrapper,
.game__field-wrapper {
  display: flex;
  justify-content: center;
}
.game__field-wrapper {
  margin-top: 10px;
}
</style>
