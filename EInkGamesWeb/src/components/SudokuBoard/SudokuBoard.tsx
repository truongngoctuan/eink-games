import React, { useState } from "react";
import { type CellState } from "./Cell";
import {
  CELL_BORDER,
  CELL_DIMENSION,
  GROUP_BORDER,
  type Coordinate,
  type SudokuGameState,
} from "./constants";
import CellGroup from "./CellGroup";
import { GAME_DATA } from "@/data/sudoku";

function getCoordinate(idx: number, size: number) {
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

function getGroups(gameState: SudokuGameState) {
  const size = 3;

  const groups: Array<CellState[]> = [];
  for (let i = 0; i < size * 3; i++) {
    groups.push([]);
  }

  for (let i = 0; i < gameState.puzzle.length; i++) {
    // result.push(gameState.puzzle.slice(i, i + size));
    const coordinate = getCoordinate(i, size);
    // console.log("groupIdx", groupIdx, iGroupRow, iGroupCol, iRow, iCol);

    const isSelected = gameState.selectingIdx === i;
    const coordinateSelected = getCoordinate(gameState.selectingIdx, size);

    groups[coordinate.groupIdx].push({
      idx: i,
      num: gameState.puzzle[i],
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

function SudokuBoard() {
  const boardDimension = CELL_DIMENSION * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;

  const [selectingIdx, setSelectingIdx] = useState<number>(-1);
  const gameState: SudokuGameState = {
    puzzle: GAME_DATA.easy.puzzle_data.puzzle,
    selectingIdx,
    solution: [],
  };

  const handleSelect = (idx: number) => {
    setSelectingIdx(idx);
  };

  const groups = getGroups(gameState);
  return (
    <div
      className="bg-black flex flex-wrap p-1"
      style={{
        width: boardDimension + borderDimension,
        height: boardDimension + borderDimension,
      }}
    >
      {groups.map((group, groupIdx) => (
        <CellGroup
          key={groupIdx}
          cells={group}
          state={group[0].coordinate}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
}

export default SudokuBoard;
