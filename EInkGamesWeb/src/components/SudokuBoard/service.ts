import { CellState } from "./Cell";
import { Coordinate, SudokuGameState, SudokuUserInput } from "./constants";

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

// each position should only input exactly once
function processUserInputs(historicalUserInputs: SudokuUserInput[]) {
  let userInputsDict = new Map<number, number>();
  historicalUserInputs.forEach(userInput => {
    userInputsDict.set(userInput.Idx, userInput.Value);
  });

  return userInputsDict;
}

type getSameConditionIdxFn = (currentIdx: number, idx: number) => number;

const getSameColIdxHandler = (currentI: number, idx: number) => {
  const iRow = currentI;
  const iCol = idx % BOARD_SIZE;

  return iRow * BOARD_SIZE + iCol;
}

const getSameRowIdxHandler = (currentI: number, idx: number) => {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = currentI;

  return iRow * BOARD_SIZE + iCol;
}

const getSameGroupIdxHandler = (currentI: number, idx: number) => {
  const iRow = Math.floor(idx / BOARD_SIZE);
  const iCol = idx % BOARD_SIZE;

  const iGroupRow = Math.floor(iRow / GROUP_SIZE);
  const iGroupCol = Math.floor(iCol / GROUP_SIZE);
  const groupIdx = iGroupRow * GROUP_SIZE + iGroupCol;

  return 0;
}

function hasBoardConflict(currentSolution: number[], idx: number, getBoardCoordinateHandler: getSameConditionIdxFn) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    const nextIdx = getBoardCoordinateHandler(i, idx);
    if (idx !== nextIdx && currentSolution[idx] !== 0 && currentSolution[idx] === currentSolution[nextIdx]) return true;
  }
  return false;
}

export function processGame(gameState: SudokuGameState) {
  const size = 3;

  const groups: Array<CellState[]> = [];
  for (let i = 0; i < size * 3; i++) {
    groups.push([]);
  }

  const currentSolution = getCurrentSolution(gameState.puzzle, gameState.userInputs);

  for (let i = 0; i < gameState.puzzle.length; i++) {
    // result.push(gameState.puzzle.slice(i, i + size));
    const coordinate = getCoordinate(i);
    // console.log("groupIdx", groupIdx, iGroupRow, iGroupCol, iRow, iCol);

    const isSelected = gameState.selectingIdx === i;
    const coordinateSelected = getCoordinate(gameState.selectingIdx);
    const isUserInput = gameState.puzzle[i] === 0;

    let hasConflict = false;
    if (hasBoardConflict(currentSolution, i, getSameColIdxHandler)) hasConflict = true;
    if (hasBoardConflict(currentSolution, i, getSameRowIdxHandler)) hasConflict = true;
    if (hasBoardConflict(currentSolution, i, getSameGroupIdxHandler)) hasConflict = true;

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

export function validateSolution(currentSolution: number[], solution: number[]) {
  solution.forEach((item, idx) => {
    if (currentSolution[idx] !== item) return false;
  });
  return true;
}
