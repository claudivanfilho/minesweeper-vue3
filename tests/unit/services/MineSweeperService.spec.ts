import { BlockType } from "@/models";
import { isBombBlock } from "@/services/MineSweeperService";
import { BlockValue } from "../../../src/models";
import {
  revealEmptyBlocksAround,
  revealAllBlocks
} from "../../../src/services/MineSweeperService";
import {
  calcBlockType,
  buildMineField
} from "../../../src/services/MineSweeperService";

describe("Test MineSweeperService", () => {
  describe("test isBombBlock method", () => {
    describe("when the block is not a bomb", () => {
      it("shoud return false", () => {
        expect(
          isBombBlock(0, 0, [
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ],
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ]
          ])
        ).toBe(false);
      });
    });

    describe("when the block is a bomb", () => {
      it("shoud return false", () => {
        expect(
          isBombBlock(0, 0, [
            [
              { value: BlockType.BOMB, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ],
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ]
          ])
        ).toBe(true);
      });
    });
  });

  describe("test calcBlockType method", () => {
    describe("when there is not bomb around", () => {
      it("shoud return 0", () => {
        expect(
          calcBlockType(0, 0, [
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ],
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ]
          ])
        ).toBe(0);
      });
    });

    describe("when there is a bomb around", () => {
      it("shoud return 1", () => {
        expect(
          calcBlockType(0, 0, [
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.EMPTY, visible: false }
            ],
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.BOMB, visible: false }
            ]
          ])
        ).toBe(1);
      });
    });
    describe("when there is two bombs around", () => {
      it("shoud return 2", () => {
        expect(
          calcBlockType(0, 0, [
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.BOMB, visible: false }
            ],
            [
              { value: BlockType.EMPTY, visible: false },
              { value: BlockType.BOMB, visible: false }
            ]
          ])
        ).toBe(2);
      });
    });
  });

  describe("test buildMineField method", () => {
    let matrix: BlockValue[][];
    beforeAll(() => {
      matrix = buildMineField(4, 2);
    });
    it("shoud create a matrix with correct size", () => {
      expect(matrix.length).toBe(4);
      expect(matrix[0].length).toBe(4);
    });

    it("shoud create a matrix with correct number of bombs", () => {
      let bombs = 0;
      matrix.forEach((row) => {
        row.forEach((col) => {
          if (col.value === BlockType.BOMB) {
            bombs += 1;
          }
        });
      });
      expect(bombs).toBe(2);
    });
  });

  describe("test revealEmptyBlocksAround", () => {
    const matrix = [
      [
        { value: BlockType.EMPTY, visible: false },
        { value: 1, visible: false },
        { value: BlockType.BOMB, visible: false }
      ],
      [
        { value: BlockType.EMPTY, visible: false },
        { value: 1, visible: false },
        { value: 1, visible: false }
      ]
    ];

    it("shoud have 4 visible blocks", () => {
      revealEmptyBlocksAround(0, 0, matrix);
      let visibleBlocks = 0;
      matrix.forEach((row) => {
        row.forEach((col) => {
          if (col.visible) {
            visibleBlocks += 1;
          }
        });
      });
      expect(visibleBlocks).toBe(4);
    });
  });

  describe("test revealAllBlocks", () => {
    const matrix = [
      [
        { value: BlockType.EMPTY, visible: false },
        { value: 1, visible: false },
        { value: BlockType.BOMB, visible: false }
      ],
      [
        { value: BlockType.EMPTY, visible: false },
        { value: 1, visible: false },
        { value: 1, visible: false }
      ]
    ];

    it("shoud all the blocks be visible", () => {
      revealAllBlocks(matrix);
      let visibleBlocks = 0;
      matrix.forEach((row) => {
        row.forEach((col) => {
          if (col.visible) {
            visibleBlocks += 1;
          }
        });
      });
      expect(visibleBlocks).toBe(6);
    });
  });
});
