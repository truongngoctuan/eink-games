import Loading from "@/components/Loading";
import { GetStaticPaths, GetStaticProps } from "next";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const SudokuBoard = dynamic(() => import("@/components/SudokuBoard"), {
  ssr: false,
});

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
    <Suspense fallback={<Loading />}>
      <SudokuBoard difficulty={difficulty} />
    </Suspense>
  );
}
