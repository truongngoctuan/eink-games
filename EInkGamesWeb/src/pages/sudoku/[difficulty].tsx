import SudokuBoard from "@/components/SudokuBoard";
import { getImagePath } from "@/components/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";

type SudokuWithLevelDifficultyPageProps = {
  difficulty: string;
};

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          difficulty: "easy",
        },
      },
      {
        params: {
          difficulty: "medium",
        },
      },
      {
        params: {
          difficulty: "hard",
        },
      },
    ],
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  return { props: { difficulty: context?.params?.difficulty as string } };
}) satisfies GetStaticProps<SudokuWithLevelDifficultyPageProps>;

export default function SudokuWithLevelDifficultyPage({
  difficulty,
}: SudokuWithLevelDifficultyPageProps) {
  return (
    <>
      <div className="bg-gray-200 my-2 p-2 flex">
        <Image
          className="mr-2"
          width={28}
          height={28}
          src={getImagePath("/game-icons/sudoku.svg")}
          alt="Sudoku icon"
        />
        <b>Sudoku Game </b> - <i>{difficulty}</i> - Game Time: 00:00:00 -
        Started
      </div>
      <SudokuBoard />
    </>
  );
}
