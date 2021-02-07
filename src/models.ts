export enum BlockType {
  BOMB = -1,
  EMPTY = 0
}

export type BlockValue = {
  value: BlockType;
  visible: boolean;
};

export enum GameState {
  COMPLETED = "completed",
  LOST = "lost",
  RUNNING = "running"
}
