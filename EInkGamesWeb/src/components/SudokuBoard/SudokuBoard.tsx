import React, { useState } from "react";
import {
  CELL_BORDER,
  CELL_DIMENSION,
  GameState as ActivityState,
  GROUP_BORDER,
  type SudokuGameState,
} from "./constants";
import CellGroup from "./CellGroup";
import { GAME_DATA } from "@/data/sudoku";
import { getCurrentSolutionMatrix, getGroups, processGame } from "./service";
import { Button } from "../ui/button";
import DebugScreen from "../DebugScreen";

function SudokuBoard() {
  const boardDimension = CELL_DIMENSION * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;

  const puzzleData = GAME_DATA[0].easy.puzzle_data;
  const [gameState, setGameState] = useState<SudokuGameState>({
    activityState: ActivityState.Started,
    userInputs: [],
    currentSolutionMatrix: getCurrentSolutionMatrix(puzzleData.puzzle, []),
  });

  // UI-related states
  const [selectingIdx, setSelectingIdx] = useState<number>(-1);

  const handleSelect = (idx: number) => {
    setSelectingIdx(idx);
  };

  const handleUserInput = (userInputValue: number) => {
    const nextGameState = processGame(puzzleData.puzzle, {
      ...gameState,
      userInputs: [
        ...gameState.userInputs,
        {
          Idx: selectingIdx,
          Value: userInputValue,
        },
      ],
    });

    setGameState(nextGameState);
  };

  // 2 stages:
  // 1. validation, progress the game logic
  // 2. build UI state for display purpose
  const groups = getGroups(puzzleData.puzzle, selectingIdx, gameState);

  const KEY_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
      <DebugScreen data="asdf" />
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
              key={v}
              onClick={(e) => handleUserInput(v)}
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
