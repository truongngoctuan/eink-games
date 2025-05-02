import React, { useState } from "react";
import { CELL_BORDER, GROUP_BORDER, type SudokuGameState } from "./constants";
import CellGroup from "./CellGroup";
import { GAME_DATA } from "@/data/sudoku";
import { getGroups, getMaxCellDimension, processGame } from "./service";
import { Button } from "../ui/button";
// import DebugScreen from "../DebugScreen";
import useWindowSize from "react-use/lib/useWindowSize";

function SudokuBoard() {
  const { width } = useWindowSize();
  const cellDimension = getMaxCellDimension(width);

  const boardDimension = cellDimension * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;

  const puzzleData = GAME_DATA[0].easy.puzzle_data;
  const [gameState, setGameState] = useState<SudokuGameState>(
    processGame(puzzleData.puzzle, [])
  );
  // console.log("gameStaTE", gameState);

  // UI-related states
  const [selectingIdx, setSelectingIdx] = useState<number>(-1);

  const handleSelect = (idx: number) => {
    setSelectingIdx(idx);
  };

  const handleUserInput = (userInputValue: number) => {
    const nextGameState = processGame(puzzleData.puzzle, [
      ...gameState.userInputs,
      {
        Idx: selectingIdx,
        Value: userInputValue,
      },
    ]);

    setGameState(nextGameState);
  };

  // 2 stages:
  // 1. validation, progress the game logic
  // 2. build UI state for display purpose
  const groups = getGroups(puzzleData.puzzle, selectingIdx, gameState);

  const KEY_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
      {/* <DebugScreen data={browserName} /> */}
      <div className="w-full md:w-fit flex justify-center md:justify-end">
        <div
          className="bg-black flex flex-wrap p-1"
          style={{
            width: boardDimension + borderDimension,
            height: boardDimension + borderDimension,
          }}
        >
          {groups.map((group, groupIdx) => (
            <CellGroup
              cellDimension={cellDimension}
              key={groupIdx}
              cells={group}
              state={group[0].coordinate}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
      <div className="w-4/5 md:w-1/3 lg:w-1/4 flex flex-col items-stretch px-2 mt-4 md:mt-0">
        <div className="mb-2 flex flex-row justify-between">
          <div>
            <Button variant="secondary" className="">
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
              size="lg"
              className="sudoku__input_button mb-2"
              disabled={gameState.Restrictions.includes(v)}
              key={v}
              onClick={() => handleUserInput(v)}
            >
              {v}
            </Button>
          ))}
          <Button
            variant="secondary"
            size="lg"
            className="sudoku__input_button"
          >
            X
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SudokuBoard;
