<template>
  <div class="emoji-block flex justify-center align-center">
    <EmojiSadIcon v-if="isLost" id="EmojiSadIcon" />
    <EmojiSmileIcon v-else-if="isRunning" id="EmojiSmileIcon" />
    <EmojiSunglassesIcon v-else-if="isCompleted" id="EmojiSunglassesIcon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GameState } from "@/models";

import EmojiSadIcon from "./icons/EmojiSadIcon.vue";
import EmojiSmileIcon from "./icons/EmojiSmileIcon.vue";
import EmojiSunglassesIcon from "./icons/EmojiSunglassesIcon.vue";

export default defineComponent({
  components: { EmojiSunglassesIcon, EmojiSmileIcon, EmojiSadIcon },
  props: {
    state: String
  },
  computed: {
    isLost(): boolean {
      return this.state === GameState.LOST;
    },
    isRunning(): boolean {
      return this.state === GameState.RUNNING;
    },
    isCompleted(): boolean {
      return this.state === GameState.COMPLETED;
    }
  }
});
</script>

<style>
.emoji-block {
  width: 30px;
  height: 30px;
  background: #c0c0c0;
  box-sizing: border-box;
  border-width: 0 1px 1px 0;
  border: 2px outset #ececec;
}
</style>
