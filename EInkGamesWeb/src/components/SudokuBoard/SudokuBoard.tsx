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

type InputKeyButtonProps = {
  value: string;
};

function InputKeyButton(props: InputKeyButtonProps) {
  const { value } = props;
  return (
    <button className="p-2 px-4 border-gray-500 border-2 w-1/5">{value}</button>
  );
}

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
    <>
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
      <div className="button-groups bg-orange-400 w-full h-40 mt-2">
        <div className="w-1/2 bg-green-500">
          <div>
            <button className="p-2 px-4 border-gray-500 border-2">
              Normal
            </button>
            <button>Candidate</button>
          </div>
          <button>Undo</button>
        </div>
        <div className="w-1/2 bg-blue-500 flex flex-row flex-wrap">
          {KEY_VALUES.map((v) => (
            <InputKeyButton key={v} value={v.toString()}></InputKeyButton>
          ))}
          <InputKeyButton value={"X"}></InputKeyButton>
        </div>
      </div>
    </>
  );
}

export default SudokuBoard;
