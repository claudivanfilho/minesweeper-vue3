<template>
  <div>
    <div
      v-if="visible"
      class="block block--visible"
      :class="(isBomb && 'block__bomb') || ''"
      :style="{
        color: fontColor
      }"
    >
      <BombIcon v-if="isBomb" />
      <span v-else-if="!isEmpty">{{ value }}</span>
    </div>
    <div v-else class="block block--hidden" @click="onClick"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BlockType } from "../models";
import BombIcon from "./icons/BombIcon.vue";

export default defineComponent({
  components: { BombIcon },
  props: {
    visible: Boolean,
    value: Number
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  },
  emits: ["click"],
  computed: {
    isBomb(): boolean {
      return this.value === BlockType.BOMB;
    },
    isEmpty(): boolean {
      return this.value === BlockType.EMPTY;
    },
    fontColor(): string {
      if (this.value === 1) {
        return "#6401FF";
      } else if (this.value === 2) {
        return "#549F53";
      } else if (this.value === 3) {
        return "#EC3735";
      }
      return "333";
    }
  }
});
</script>

<style>
.block {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
.block--visible {
  background: #c0c0c0;
  box-sizing: border-box;
  border-width: 0 1px 1px 0;
  border: 1px solid #808080;
}
.block--hidden {
  cursor: pointer;
  background: #c0c0c0;
  box-sizing: border-box;
  border-width: 0 1px 1px 0;
  border: 2px outset #ececec;
}
.block__bomb {
  background: red;
}
</style>
