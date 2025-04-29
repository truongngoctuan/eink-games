import { CellState } from "./Cell";
import { Coordinate, SudokuGameState, SudokuUserInput } from "./constants";


export function getCoordinate(idx: number, size: number) {
  const iRow = Math.floor(idx / (size * 3));
  const iCol = idx % (size * 3);

  const iGroupRow = Math.floor(iRow / size);
  const iGroupCol = Math.floor(iCol / size);
  const groupIdx = iGroupRow * size + iGroupCol;

  var coor: Coordinate = {
    iRow,
    iCol,
    iGroupCol,
    iGroupRow,
    groupIdx,
  };

  return coor;
}

export function getGroups(gameState: SudokuGameState) {
  const size = 3;

  const groups: Array<CellState[]> = [];
  for (let i = 0; i < size * 3; i++) {
    groups.push([]);
  }

  const currentSolution = getCurrentSolution(gameState.puzzle, gameState.userInputs);

  for (let i = 0; i < gameState.puzzle.length; i++) {
    // result.push(gameState.puzzle.slice(i, i + size));
    const coordinate = getCoordinate(i, size);
    // console.log("groupIdx", groupIdx, iGroupRow, iGroupCol, iRow, iCol);

    const isSelected = gameState.selectingIdx === i;
    const coordinateSelected = getCoordinate(gameState.selectingIdx, size);

    groups[coordinate.groupIdx].push({
      idx: i,
      num: currentSolution[i],
      coordinate,
      isUserInput: gameState.puzzle[i] === 0,
      selected: isSelected,
      isHightlighted:
        coordinateSelected.iCol === coordinate.iCol ||
        coordinateSelected.iRow === coordinate.iRow ||
        coordinateSelected.groupIdx === coordinate.groupIdx,
      isSameNum:
        gameState.puzzle[gameState.selectingIdx] !== 0 &&
        gameState.puzzle[i] === gameState.puzzle[gameState.selectingIdx],
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
