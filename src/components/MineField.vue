<template>
  <div class="flex flex-column">
    <div
      class="flex"
      v-for="(row, rowIndex) in mineField"
      :key="`row${rowIndex}`"
    >
      <div v-for="(col, colIndex) in row" :key="`col${colIndex}`">
        <Block
          :value="col.value"
          :visible="col.visible"
          @click="onBlockClick(rowIndex, colIndex)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import {
  buildMineField,
  revealAllBlocks,
  revealEmptyBlocksAround,
  isComplete
} from "../services/MineSweeperService";
import Block from "./Block.vue";
import { GameState, BlockType } from "@/models";

export default defineComponent({
  components: { Block },
  props: {
    minesQuantity: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    state: String
  },
  emits: ["lost", "complete"],
  data() {
    const mineField = buildMineField(this.size, this.minesQuantity);
    return {
      mineField
    };
  },
  watch: {
    state(val: GameState) {
      if (val === GameState.RUNNING) {
        const mineField = buildMineField(this.size, this.minesQuantity);
        this.mineField = mineField;
      }
    }
  },
  methods: {
    onBlockClick(row: number, col: number) {
      if (this.mineField[row][col].value === BlockType.EMPTY) {
        revealEmptyBlocksAround(row, col, this.mineField);
      } else if (this.mineField[row][col].value === BlockType.BOMB) {
        this.$emit("lost");
        revealAllBlocks(this.mineField);
      } else {
        this.mineField[row][col].visible = true;
      }
      if (isComplete(this.mineField, this.minesQuantity)) {
        this.$emit("complete");
      }
    }
  }
});
</script>
