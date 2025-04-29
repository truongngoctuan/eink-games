import SudokuBoard from "@/components/SudokuBoard";
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
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  return { props: { difficulty: context?.params?.difficulty as string } };
}) satisfies GetStaticProps<SudokuWithLevelDifficultyPageProps>;

export default function SudokuWithLevelDifficultyPage({
  difficulty,
}: SudokuWithLevelDifficultyPageProps) {
  return (
    <div className="flex flex-col border-2 border-white">
      <h1 className="font-extrabold font-serif text-xl">Built for Kindle</h1>

      <div className="bg-gray-200 my-2 p-2 flex">
        <Image
          className="mr-2"
          width={28}
          height={28}
          src="/game-icons/sudoku.svg"
          alt="Sudoku icon"
        />
        <b>Sudoku Game </b> - <i>{difficulty}</i> - Game Time: 00:00:00 -
        Started
      </div>
      <SudokuBoard />
    </div>
  );
}
