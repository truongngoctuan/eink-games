import React, { useState } from "react";
import {
  CELL_BORDER,
  CELL_DIMENSION,
  GROUP_BORDER,
  type SudokuGameState,
} from "./constants";
import CellGroup from "./CellGroup";
import { GAME_DATA } from "@/data/sudoku";
import { getGroups } from "./service";
import { Button } from "../ui/button";

function SudokuBoard() {
  const boardDimension = CELL_DIMENSION * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;

  const [selectingIdx, setSelectingIdx] = useState<number>(-1);
  const gameState: SudokuGameState = {
    puzzle: GAME_DATA[0].easy.puzzle_data.puzzle,
    selectingIdx,
    solution: [],
  };

  const handleSelect = (idx: number) => {
    setSelectingIdx(idx);
  };

  const groups = getGroups(gameState);

  const KEY_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-wrap">
      <div className="sm:w-full md:w-2/3 bg-amber-300">
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
      </div>
      <div className="bg-orange-400 sm:w-2/3 md:w-1/3 mt-2 flex flex-col items-stretch px-2">
        <div className="my-2 flex flex-row justify-between">
          <div>
            <Button variant="secondary" className="mr-2">
              Normal
            </Button>
            <Button variant="secondary">Candidate</Button>
          </div>
          <Button variant="secondary">Undo</Button>
        </div>
        <div className="flex flex-row flex-wrap justify-between">
          {KEY_VALUES.map((v) => (
            <Button
              variant="secondary"
              className="sudoku__input_button mb-1"
              key={v}
            >
              {v}
            </Button>
          ))}
          <Button variant="secondary" className="sudoku__input_button">
            X
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SudokuBoard;
