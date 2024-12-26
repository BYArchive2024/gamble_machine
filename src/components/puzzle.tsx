"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button, Grid2, LinearProgress, Typography } from "@mui/material";
import {
  easyProblem,
  normalProblem,
  hardProblem,
  harderProblem,
  demonProblem,
} from "./problems";
import { AlertDialog } from "./dialog";
import { useTransitionRouter } from "next-view-transitions";
import { useCookies } from "next-client-cookies";

const problems = [
  easyProblem,
  normalProblem,
  hardProblem,
  harderProblem,
  demonProblem,
];

function getRandomInt(max: number) {
  return [Math.floor(Math.random() * max), Math.floor(Math.random() * max)]; //2차원 배열 중에서 랜덤한 위치를 반환 (x, y)
}

export default function Puzzle() {
  const [puzzle, setPuzzle] = useState<string[][]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(100);
  const [timeDuration, setTimeDuration] = useState<number>(0);
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number>(0);
  const [dialogState, setDialogState] = useState({
    failed: false,
    result: false,
    clear: false,
  });
  const router = useTransitionRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const cookies = useCookies();

  const failed = () => {
    clearInterval(timer.current as NodeJS.Timeout);
    setDialogState((prev) => ({ ...prev, failed: true }));
  };

  const passed = () => {
    clearInterval(timer.current as NodeJS.Timeout);
    setDialogState((prev) => ({ ...prev, result: true }));
  };

  const startNewRound = (problemIndex: number) => {
    const ps = problems[problemIndex];
    const pos = getRandomInt(ps.boundary);
    const ori: string[][] = Array.from({ length: ps.boundary }, () =>
      Array(ps.boundary).fill(ps.letters[0])
    );
    ori[pos[0]][pos[1]] = ps.letters[1];
    setPuzzle(ori);
    setAnswer(ps.letters[1]);
    setTimeDuration(ps.time_limit);
    setTimeLeft(100);

    timer.current = setInterval(() => {
      setTimeDuration((prev) => {
        const newTimeDuration = prev - 1;
        const percentage = (newTimeDuration / ps.time_limit) * 100;
        setTimeLeft(percentage);

        if (newTimeDuration < 0) {
          failed();
        }

        return newTimeDuration;
      });
    }, 1000);
  };

  useEffect(() => {
    startNewRound(currentProblemIndex);
    return () => clearInterval(timer.current as NodeJS.Timeout);
  }, [currentProblemIndex]);

  const handleClick = (letter: string) => {
    if (letter === answer) passed();
  };

  const handlePassedConfirm = () => {
    setDialogState((prev) => ({ ...prev, result: false }));
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1);
    } else {
      setDialogState((prev) => ({ ...prev, clear: true }));
    }
  };

  const handlePassedCancel = async () => {
    setDialogState((prev) => ({ ...prev, result: false }));
    const prev = Number(cookies.get("balance")) || 0;
    cookies.set(
      "balance",
      Math.floor(prev * problems[currentProblemIndex].multiplier).toString()
    );
    await fetch("/api/update");
    document.startViewTransition(() => router.push("/ready"));
  };

  const handleFailedCancel = async () => {
    setDialogState((prev) => ({ ...prev, failed: false }));
    const prev = Number(cookies.get("balance")) || 0;
    cookies.set("balance", Math.floor(prev * 0.5).toString());
    await fetch("/api/update");
    document.startViewTransition(() => router.push("/ready"));
  };

  const handleClearBtn = async () => {
    setDialogState((prev) => ({ ...prev, clear: false }));
    const prev = Number(cookies.get("balance")) || 0;
    cookies.set("balance", Math.floor(prev * 3.0).toString());
    await fetch("/api/update");
    document.startViewTransition(() => router.push("/"));
  };

  return (
    <div className="flex flex-col gap-10">
      <Typography
        variant="h4"
        sx={{
          fontSize: 25,
          fontFamily: "Paperlogy-8ExtraBold",
          color: timeDuration <= 2 ? "red" : "white",
        }}
      >{`${timeDuration + 1}초 남았어요.`}</Typography>
      <LinearProgress variant="determinate" value={timeLeft} />
      <Grid2
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {puzzle.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <Grid2
              size={{ xs: 2, sm: 4, md: 12 / puzzle.length }}
              key={`${rowIndex}-${colIndex}`}
            >
              <Button
                variant="text"
                sx={{
                  width: "100%",
                  height: 60,
                  backgroundColor: "white",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  fontSize: currentProblemIndex > 3 ? 13 : 20,
                  fontFamily: "Paperlogy-8ExtraBold",
                }}
                onClick={() => handleClick(letter)}
              >
                {letter}
              </Button>
            </Grid2>
          ))
        )}
      </Grid2>
      <AlertDialog
        title="ㅋㅋ"
        open={dialogState.failed}
        content={"조금만 더 빨리 찾아보세요ㅋ"}
        onCancel={handleFailedCancel}
      />
      <AlertDialog
        title="WTF"
        open={dialogState.clear}
        content={"어케함"}
        onClear={handleClearBtn}
      />
      <AlertDialog
        title="ㄷㄷ"
        open={dialogState.result}
        content={"다음 문제로 넘어갈까요?"}
        onConfirm={handlePassedConfirm}
        onCancel={handlePassedCancel}
      />
    </div>
  );
}
