import { getImagePath } from "@/components/utils";
import Image from "next/image";
import Link from "next/link";

export default function GameSeletorPage() {
  return (
    <Link className="" href="/sudoku">
      <div className="my-2 p-2 flex flex-col items-center">
        <Image
          className="mr-2"
          width={128}
          height={128}
          src={getImagePath("/game-icons/sudoku.svg")}
          alt="Sudoku icon"
        />
        <b className="font-xl font-semibold">Sudoku Game </b>
      </div>
    </Link>
  );
}
