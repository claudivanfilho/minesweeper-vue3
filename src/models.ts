export enum BlockType {
  BOMB = -1,
  EMPTY = 0
}

export type BlockValue = {
  value: BlockType | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  visible: boolean;
};

export enum GameState {
  COMPLETED = "completed",
  LOST = "lost",
  RUNNING = "running"
}
