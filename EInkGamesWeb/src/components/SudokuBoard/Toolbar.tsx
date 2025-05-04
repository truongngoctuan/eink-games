import Image from "next/image";
import React from "react";
import { getImagePath } from "../utils";
import { SudokuGameState } from "./constants";
import { getActivityStateString } from "./service";
import { DropdownMenu } from "./DropDownMenu";

type ToolbarProps = {
  difficulty: string;
  gameState: SudokuGameState;
};
function Toolbar(props: ToolbarProps) {
  const { difficulty, gameState } = props;
  return (
    <div className="bg-gray-200 my-2 p-2 flex">
      <Image
        className="mr-2"
        width={28}
        height={28}
        src={getImagePath("/game-icons/sudoku.svg")}
        alt="Sudoku icon"
      />
      <b>Sudoku Game </b>
      &nbsp; - &nbsp;
      <i>{difficulty}</i>
      &nbsp; - &nbsp;
      {getActivityStateString(gameState.activityState)}
      <DropdownMenu />
    </div>
  );
}

export default Toolbar;
