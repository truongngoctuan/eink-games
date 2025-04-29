// CSS attributes
export const CELL_DIMENSION = 48;
export const GROUP_BORDER = 4;
export const CELL_BORDER = 1;

// game level selection
export const DIFFICULTY_LEVELS = ["easy", "medium", "hard"];

//generic game board
export enum GameState {
  Started = 0,
  InProgress,
  Completed
}

//sudoku game state
export type SudokuGameState = {
  puzzle: number[];
  selectingIdx: number;
  activityState: GameState;
  userInputs: SudokuUserInput[];
};

export type Coordinate = {
  iRow: number;
  iCol: number;
  iGroupRow: number;
  iGroupCol: number;
  groupIdx: number;
};

export type SudokuUserInput = {
  Idx: number;
  Value: number;
};