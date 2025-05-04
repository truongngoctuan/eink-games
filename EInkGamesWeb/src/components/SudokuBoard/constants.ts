// CSS attributes
export const CELL_DIMENSION = 48;
export const GROUP_BORDER = 4;
export const CELL_BORDER = 1;

// game level selection
export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];
export const KEY_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//generic game board
export enum ActivityState {
  Started = 0,
  InProgress,
  Completed
}

export type MatrixItem = {
  Value: number;
  HasError: boolean;
}

//sudoku game state
export type SudokuGameState = {
  activityState: ActivityState;
  userInputs: SudokuUserInput[];
  // TODO: can also store a dict of error/validation errors instead of a whole matrix
  currentSolutionMatrix: MatrixItem[][];
  Restrictions: number[];
};

export type Coordinate = {
  iRow: number;
  iCol: number;
  iGroupRow: number;
  iGroupCol: number;
  groupIdx: number;
};

export type XYCoordinate = {
  X: number;
  Y: number;
}

export type SudokuUserInput = {
  Idx: number;
  Value: number;
};