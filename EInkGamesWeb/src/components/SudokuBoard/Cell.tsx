import React from "react";
import { CELL_BORDER, Coordinate } from "./constants";
import clsx from "clsx";
import { browserName } from "react-device-detect";

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
  cellDimension: number;
  state: CellState;
  onSelect: (idx: number) => void;
};

function Cell(props: CellProps & { className?: string }) {
  const { className, cellDimension, state, onSelect } = props;
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
          "bg-white":
            state.isUserInput &&
            !state.selected &&
            !state.isHightlighted &&
            !state.isSameNum,
        },
        className
      )}
      style={{
        width: cellDimension,
        height: cellDimension,
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

function MultiBrowsersCell(props: CellProps) {
  const { state } = props;
  if (browserName === "Kindle") {
    return (
      <Cell
        {...props}
        className={clsx(
          {
            "bg-white":
              !state.isUserInput &&
              !state.selected &&
              !state.isHightlighted &&
              !state.isSameNum,
          },
          {
            underline: !state.isUserInput,
          },
          {
            "bg-gray-600": state.selected,
          },
          {
            "bg-gray-300": state.isHightlighted,
          },
          {
            "bg-gray-300": state.isSameNum,
          }
        )}
      />
    );
  }

  return (
    <Cell
      {...props}
      className={clsx(
        {
          "bg-gray-200":
            !state.isUserInput &&
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
    />
  );
}

export default MultiBrowsersCell;
