import { CellState } from "./Cell";
import { Coordinate, SudokuGameState, SudokuUserInput, XYCoordinate } from "./constants";

const BOARD_SIZE = 9;
const GROUP_SIZE = 3;

function getCoordinate(idx: number) {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = idx % BOARD_SIZE;

  const iGroupRow = Math.floor(iRow / GROUP_SIZE);
  const iGroupCol = Math.floor(iCol / GROUP_SIZE);
  const groupIdx = iGroupRow * GROUP_SIZE + iGroupCol;

  var coor: Coordinate = {
    iRow,
    iCol,
    iGroupCol,
    iGroupRow,
    groupIdx,
  };

  return coor;
}

function getXYCoordinate(idx: number): XYCoordinate {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = idx % BOARD_SIZE;

  return {
    Y: iRow,
    X: iCol,
  };
}

// each position should only input exactly once
function processUserInputs(historicalUserInputs: SudokuUserInput[]) {
  let userInputsDict = new Map<number, number>();
  historicalUserInputs.forEach(userInput => {
    userInputsDict.set(userInput.Idx, userInput.Value);
  });

  return userInputsDict;
}

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

function hasBoardConflict(currentSolutionMatrix: number[][], idx: number, getBoardCoordinateHandler: getSameConditionIdxFn) {
  const currentXY = getXYCoordinate(idx);
  // if (idx === 0) console.log("currentXY", currentXY);
  if (currentSolutionMatrix[currentXY.Y][currentXY.X] === 0) return false;
  const currentValue = currentSolutionMatrix[currentXY.Y][currentXY.X];
  // if (idx === 0) console.log("currentValue", currentValue);

  for (let i = 0; i < BOARD_SIZE; i++) {
    const nextXY = getBoardCoordinateHandler(i, idx);
    // if (idx === 0) console.log("nextXY", nextXY);
    const nextValue = currentSolutionMatrix[nextXY.Y][nextXY.X];
    // if (idx === 0) console.log("nextValue", nextValue);

    if (!(currentXY.X === nextXY.X && currentXY.Y === nextXY.Y) &&
      nextValue !== 0 &&
      currentValue === nextValue)
      return true;
  }
  return false;
}

export function processGame(gameState: SudokuGameState) {
  const groups: Array<CellState[]> = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    groups.push([]);
  }

  const currentSolution = getCurrentSolution(gameState.puzzle, gameState.userInputs);
  const currentSolutionMatrix = getCurrentSolutionMatrix(gameState.puzzle, gameState.userInputs);

  for (let i = 0; i < gameState.puzzle.length; i++) {
    const coordinate = getCoordinate(i);

    const isSelected = gameState.selectingIdx === i;
    const coordinateSelected = getCoordinate(gameState.selectingIdx);
    const isUserInput = gameState.puzzle[i] === 0;

    let hasConflict = false;
    if (hasBoardConflict(currentSolutionMatrix, i, getSameColIdxHandler)) hasConflict = true;
    if (hasBoardConflict(currentSolutionMatrix, i, getSameRowIdxHandler)) hasConflict = true;
    if (hasBoardConflict(currentSolutionMatrix, i, getSameGroupIdxHandler)) hasConflict = true;

    groups[coordinate.groupIdx].push({
      idx: i,
      num: currentSolution[i],
      coordinate,
      isUserInput,
      selected: isSelected,
      isHightlighted:
        coordinateSelected.iCol === coordinate.iCol ||
        coordinateSelected.iRow === coordinate.iRow ||
        coordinateSelected.groupIdx === coordinate.groupIdx,
      isSameNum:
        gameState.puzzle[gameState.selectingIdx] !== 0 &&
        gameState.puzzle[i] === gameState.puzzle[gameState.selectingIdx],
      hasConflict,
    });
  }
  return groups;
}

export function getCurrentSolution(puzzle: number[], userInputs: SudokuUserInput[]) {
  var solution = [...puzzle];

  userInputs.forEach((userInput) => {
    solution[userInput.Idx] = userInput.Value;
  });

  return solution;
}

// return a 2D array to navigate between items a bit easier
function getCurrentSolutionMatrix(puzzle: number[], userInputs: SudokuUserInput[]) {
  const currentSolution = getCurrentSolution(puzzle, userInputs);

  let arr = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    arr.push(currentSolution.slice(i * BOARD_SIZE, (i + 1) * BOARD_SIZE));
  }

  return arr;
}

export function validateSolution(currentSolution: number[], solution: number[]) {
  solution.forEach((item, idx) => {
    if (currentSolution[idx] !== item) return false;
  });
  return true;
}
