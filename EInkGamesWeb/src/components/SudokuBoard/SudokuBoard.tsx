import React, { useState } from "react";
import { CELL_BORDER, GROUP_BORDER, SudokuUserInput } from "./constants";
import CellGroup from "./CellGroup";
import { GAME_DATA } from "@/data/sudoku";
import { getGroups, getMaxCellDimension, processGame } from "./service";
// import DebugScreen from "../DebugScreen";
import useWindowSize from "react-use/lib/useWindowSize";
import Toolbar from "./Toolbar";
import UserInputs from "./UserInputs";

type SudokuBoardProps = {
  difficulty: string;
};

function SudokuBoard(props: SudokuBoardProps) {
  const difficulty = props.difficulty ?? "easy";

  const { width } = useWindowSize();
  const cellDimension = getMaxCellDimension(width);

  const boardDimension = cellDimension * 9;
  const borderDimension = 4 * GROUP_BORDER + 3 * 2 * CELL_BORDER;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  const puzzleData = (GAME_DATA[0] as any)[difficulty].puzzle_data;
  const [userInputs, setUserInputs] = useState<SudokuUserInput[]>([]);
  const gameState = processGame(puzzleData.puzzle, userInputs);
  // console.log("gameStaTE", gameState);

  // UI-related states
  const [selectingIdx, setSelectingIdx] = useState<number>(-1);

  const handleSelect = (idx: number) => {
    setSelectingIdx(idx);
  };

  const handleUserInput = (userInputValue: number) => {
    setUserInputs([
      ...userInputs,
      {
        Idx: selectingIdx,
        Value: userInputValue,
      },
    ]);
  };

  // 2 stages:
  // 1. validation, progress the game logic
  // 2. build UI state for display purpose
  const groups = getGroups(puzzleData.puzzle, selectingIdx, gameState);

  return (
    <>
      <Toolbar difficulty={difficulty} gameState={gameState} />
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
          <UserInputs
            restrictions={gameState.Restrictions}
            onUserInput={handleUserInput}
          />
        </div>
      </div>
    </>
  );
}

export default SudokuBoard;
