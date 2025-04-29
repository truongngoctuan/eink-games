export const CELL_DIMENSION = 48;
export const GROUP_BORDER = 4;
export const CELL_BORDER = 1;

export type SudokuGameState = {
  puzzle: number[];
  selectingIdx: number;
  solution: number[];
};

export type Coordinate = {
  iRow: number;
  iCol: number;
  iGroupRow: number;
  iGroupCol: number;
  groupIdx: number;
};

export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];