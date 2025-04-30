import React from "react";
import { CELL_BORDER, CELL_DIMENSION, Coordinate } from "./constants";
import clsx from "clsx";

export type CellState = {
  idx: number;
  num: number;
  coordinate: Coordinate;
  selected: boolean;
  isUserInput: boolean;
  isHightlighted: boolean;
  isSameNum: boolean;
  hasConflict: boolean;
};

type CellProps = {
  state: CellState;
  onSelect: (idx: number) => void;
};

function Cell(props: CellProps) {
  const { state, onSelect } = props;
  const displayText = state.num === 0 ? "" : state.num;

  let marginRight = CELL_BORDER;
  if ((state.coordinate.iCol + 1) % 3 === 0) {
    marginRight = 0;
  }

  let marginBottom = CELL_BORDER;
  if ((state.coordinate.iRow + 1) % 3 === 0) {
    marginBottom = 0;
  }

  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center cell relative",
        {
          "bg-gray-200":
            !state.isUserInput &&
            !state.selected &&
            !state.isHightlighted &&
            !state.isSameNum,
        },
        {
          underline: !state.isUserInput,
        },
        {
          "bg-white":
            state.isUserInput &&
            !state.selected &&
            !state.isHightlighted &&
            !state.isSameNum,
        },
        {
          "bg-amber-600": state.selected,
        },
        {
          "bg-amber-300": state.isHightlighted,
        },
        {
          "bg-amber-400": state.isSameNum,
        }
      )}
      style={{
        width: CELL_DIMENSION,
        height: CELL_DIMENSION,
        marginRight,
        marginBottom,
      }}
      onClick={() => onSelect(state.idx)}
      onTouchEnd={() => onSelect(state.idx)}
      onTouchStart={() => onSelect(state.idx)}
    >
      <span className="font-semibold font-san text-3xl">{displayText}</span>
      <div
        className={clsx(
          "absolute bottom-1 right-1 bg-red-400 rounded-full w-2 h-2",
          {
            hidden: !state.hasConflict,
          }
        )}
      ></div>
    </div>
  );
}

export default Cell;
