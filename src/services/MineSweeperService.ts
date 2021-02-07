import { BlockType, BlockValue } from "../models";
import { randomNumber } from "../utils";

export function isBombBlock(row: number, col: number, matrix: BlockValue[][]) {
  try {
    const value = matrix[row][col];
    return value.value === BlockType.BOMB;
  } catch {
    return false;
  }
}

export function calcBlockType(
  row: number,
  col: number,
  matrix: BlockValue[][]
) {
  if (matrix[row][col].value === BlockType.BOMB) {
    return BlockType.BOMB;
  }
  let bombsAround = 0;
  bombsAround += isBombBlock(row - 1, col, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row - 1, col - 1, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row - 1, col + 1, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row, col - 1, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row, col + 1, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row + 1, col, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row + 1, col - 1, matrix) ? 1 : 0;
  bombsAround += isBombBlock(row + 1, col + 1, matrix) ? 1 : 0;
  return bombsAround;
}

export function buildMineField(size: number, minesQuantity: number) {
  const matrix: BlockValue[][] = new Array(size).fill(0).map(() =>
    new Array(size).fill(0).map(() => ({
      value: BlockType.EMPTY,
      visible: false
    }))
  );
  let numberOfMinesAdded = 0;
  while (numberOfMinesAdded !== minesQuantity) {
    const row = randomNumber(0, size);
    const col = randomNumber(0, size);
    if (matrix[row][col].value !== BlockType.BOMB) {
      matrix[row][col].value = BlockType.BOMB;
      numberOfMinesAdded += 1;
    }
  }
  return matrix.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      return {
        value: calcBlockType(rowIndex, colIndex, matrix),
        visible: false
      };
    })
  );
}

export function revealAllBlocks(matrix: BlockValue[][]) {
  matrix.forEach((row) => {
    row.forEach((col) => {
      col.visible = true;
    });
  });
}

function tryRevealBlock(row2: number, col2: number, matrix2: BlockValue[][]) {
  try {
    if (matrix2[row2][col2].value === BlockType.EMPTY) {
      return true;
    } else {
      matrix2[row2][col2].visible = true;
      return false;
    }
  } catch {
    return false;
  }
}

export function revealEmptyBlocksAround(
  row: number,
  col: number,
  matrix: BlockValue[][],
  checked: string[] = []
) {
  if (checked.includes(`row${row},col${col}`)) {
    return;
  }
  matrix[row][col].visible = true;
  checked.push(`row${row},col${col}`);
  tryRevealBlock(row - 1, col - 1, matrix) &&
    revealEmptyBlocksAround(row - 1, col - 1, matrix, checked);
  tryRevealBlock(row - 1, col, matrix) &&
    revealEmptyBlocksAround(row - 1, col, matrix, checked);
  tryRevealBlock(row - 1, col + 1, matrix) &&
    revealEmptyBlocksAround(row - 1, col + 1, matrix, checked);
  tryRevealBlock(row, col - 1, matrix) &&
    revealEmptyBlocksAround(row, col - 1, matrix, checked);
  tryRevealBlock(row, col + 1, matrix) &&
    revealEmptyBlocksAround(row, col + 1, matrix, checked);
  tryRevealBlock(row + 1, col - 1, matrix) &&
    revealEmptyBlocksAround(row + 1, col - 1, matrix, checked);
  tryRevealBlock(row + 1, col, matrix) &&
    revealEmptyBlocksAround(row + 1, col, matrix, checked);
  tryRevealBlock(row + 1, col + 1, matrix) &&
    revealEmptyBlocksAround(row + 1, col + 1, matrix, checked);
}

export function isComplete(matrix: BlockValue[][], minesQuantity: number) {
  let hiddenBlocks = 0;
  matrix.forEach((row) => {
    row.forEach((col) => {
      if (!col.visible) {
        hiddenBlocks += 1;
      }
    });
  });
  return hiddenBlocks === minesQuantity;
}
