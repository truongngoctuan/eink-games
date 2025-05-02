import { CellState } from "./Cell";
import { ActivityState, CELL_BORDER, CELL_DIMENSION, Coordinate, GROUP_BORDER, MatrixItem, SudokuGameState, SudokuUserInput, XYCoordinate } from "./constants";

export function getBoardDimension(cellSize: number) {
  return cellSize * 9 + 4 * GROUP_BORDER + 6 * CELL_BORDER;
}

export function getMaxCellDimension(windowWidth: number) {
  if (windowWidth === Infinity) return 0;
  return Math.min(
    Math.floor((windowWidth - (4 * GROUP_BORDER + 6 * CELL_BORDER)) / 9 - 1),
    CELL_DIMENSION
  );
}

const BOARD_SIZE = 9;
const GROUP_SIZE = 3;

function getCoordinate(idx: number) {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = idx % BOARD_SIZE;

  const iGroupRow = Math.floor(iRow / GROUP_SIZE);
  const iGroupCol = Math.floor(iCol / GROUP_SIZE);
  const groupIdx = iGroupRow * GROUP_SIZE + iGroupCol;

  return {
    iRow,
    iCol,
    iGroupCol,
    iGroupRow,
    groupIdx,
  } satisfies Coordinate;
}

function getXYCoordinate(idx: number): XYCoordinate {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = idx % BOARD_SIZE;

  return {
    Y: iRow,
    X: iCol,
  };
}

// // each position should only input exactly once
// function processUserInputs(historicalUserInputs: SudokuUserInput[]) {
//   let userInputsDict = new Map<number, number>();
//   historicalUserInputs.forEach(userInput => {
//     userInputsDict.set(userInput.Idx, userInput.Value);
//   });

//   return userInputsDict;
// }

type getSameConditionIdxFn = (currentIdx: number, idx: number) => XYCoordinate;

const getSameColIdxHandler = (currentI: number, idx: number) => {
  const iRow = currentI;
  const iCol = idx % BOARD_SIZE;

  return {
    Y: iRow,
    X: iCol,
  } satisfies XYCoordinate
}

const getSameRowIdxHandler = (currentI: number, idx: number) => {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = currentI;

  return {
    Y: iRow,
    X: iCol,
  } satisfies XYCoordinate
}

const getSameGroupIdxHandler = (currentI: number, idx: number) => {
  const coordinate = getCoordinate(idx);
  const groupIdx = coordinate.groupIdx;

  const iGroupRow = Math.floor(currentI / GROUP_SIZE);
  const iGroupCol = currentI % GROUP_SIZE;

  const iRow = Math.floor(groupIdx / GROUP_SIZE) * GROUP_SIZE + iGroupRow;
  const iCol = (groupIdx % GROUP_SIZE) * GROUP_SIZE + iGroupCol;

  return {
    Y: iRow,
    X: iCol,
  } satisfies XYCoordinate
}

function hasBoardConflict(currentSolutionMatrix: MatrixItem[][], idx: number, getBoardCoordinateHandler: getSameConditionIdxFn) {
  const currentXY = getXYCoordinate(idx);
  // if (idx === 0) console.log("currentXY", currentXY);
  if (currentSolutionMatrix[currentXY.Y][currentXY.X].Value === 0) return false;
  const currentValue = currentSolutionMatrix[currentXY.Y][currentXY.X].Value;
  // if (idx === 0) console.log("currentValue", currentValue);

  for (let i = 0; i < BOARD_SIZE; i++) {
    const nextXY = getBoardCoordinateHandler(i, idx);
    // if (idx === 0) console.log("nextXY", nextXY);
    const nextValue = currentSolutionMatrix[nextXY.Y][nextXY.X].Value;
    // if (idx === 0) console.log("nextValue", nextValue);

    if (!(currentXY.X === nextXY.X && currentXY.Y === nextXY.Y) &&
      nextValue !== 0 &&
      currentValue === nextValue)
      return true;
  }
  return false;
}

export function processGame(puzzle: number[], userInputs: SudokuUserInput[]): SudokuGameState {

  const currentSolution = getCurrentSolution(puzzle, userInputs);
  const currentSolutionMatrix = toMatrix(currentSolution);

  for (let i = 0; i < puzzle.length; i++) {
    const xyCoordinate = getXYCoordinate(i);

    let hasConflict = false;
    // TODO can be optimized a bit more
    if (hasBoardConflict(currentSolutionMatrix, i, getSameColIdxHandler)) hasConflict = true;
    if (hasBoardConflict(currentSolutionMatrix, i, getSameRowIdxHandler)) hasConflict = true;
    if (hasBoardConflict(currentSolutionMatrix, i, getSameGroupIdxHandler)) hasConflict = true;

    if (hasConflict) {
      currentSolutionMatrix[xyCoordinate.Y][xyCoordinate.X].HasError = hasConflict;
    }
  }

  const nextGameState: SudokuGameState = {
    activityState: userInputs.length === 0 ? ActivityState.Started : ActivityState.InProgress,
    userInputs: userInputs,
    currentSolutionMatrix: currentSolutionMatrix,
    Restrictions: reachMaximumCounters(currentSolution),
  }

  return nextGameState;
}

//TODO: can remove puzzle by adding more infor into MatrixItem
export function getGroups(puzzle: number[], selectingIdx: number, gameState: SudokuGameState) {
  const groups: Array<CellState[]> = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    groups.push([]);
  }

  for (let i = 0; i < puzzle.length; i++) {
    const coordinate = getCoordinate(i);
    const matrixItem = gameState.currentSolutionMatrix[coordinate.iRow][coordinate.iCol];

    const isSelected = selectingIdx === i;
    const coordinateSelected = getCoordinate(selectingIdx);
    const isUserInput = puzzle[i] === 0;

    const hasConflict = matrixItem.HasError;

    groups[coordinate.groupIdx].push({
      idx: i,
      num: matrixItem.Value,
      coordinate,
      isUserInput,
      selected: isSelected,
      isHightlighted:
        coordinateSelected.iCol === coordinate.iCol ||
        coordinateSelected.iRow === coordinate.iRow ||
        coordinateSelected.groupIdx === coordinate.groupIdx,
      isSameNum:
        puzzle[selectingIdx] !== 0 &&
        puzzle[i] === puzzle[selectingIdx],
      hasConflict,
    });
  }
  return groups;
}

export function getCurrentSolution(puzzle: number[], userInputs: SudokuUserInput[]) {
  const solution = [...puzzle];

  userInputs.forEach((userInput) => {
    solution[userInput.Idx] = userInput.Value;
  });

  return solution;
}

// return a 2D array to navigate between items a bit easier
export function toMatrix(currentSolution: number[]): MatrixItem[][] {
  const arr = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    arr.push(
      currentSolution
        .slice(i * BOARD_SIZE, (i + 1) * BOARD_SIZE)
        .map(item => ({ Value: item, HasError: false } satisfies MatrixItem))
    );
  }

  return arr;
}

export function validateSolution(currentSolution: number[], solution: number[]) {
  solution.forEach((item, idx) => {
    if (currentSolution[idx] !== item) return false;
  });
  return true;
}

function reachMaximumCounters(currentSolution: number[]): number[] {
  const restrictions = [];
  for (let i = 1; i <= 9; i++) {
    if (currentSolution.filter(item => item === i).length >= 9) {
      restrictions.push(i);
    }
  }
  return restrictions;
}