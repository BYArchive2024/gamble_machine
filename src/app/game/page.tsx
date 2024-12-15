"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function Game() {
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [userChoice, setUserChoice] = useState<null | "odd" | "even">(null);
  const [gameStatus, setGameStatus] =
    useState<string>("홀수/짝수를 선택해주세요!");
  const [rolling, setRolling] = useState<boolean>(false);

  const rollManipulatedDice = useCallback(() => {
    if (!userChoice) return null;

    const probability = Math.random();
    const isOdd = userChoice === "odd";

    if (isOdd) {
      return probability < 0.2 ? getRandomOdd() : getRandomEven();
    } else {
      return probability < 0.2 ? getRandomEven() : getRandomOdd();
    }
  }, [userChoice]);

  const getRandomOdd = () => [1, 3, 5][Math.floor(Math.random() * 3)];

  const getRandomEven = () => [2, 4, 6][Math.floor(Math.random() * 3)];

  const checkWinner = useCallback(
    (result: number) => {
      if (userChoice === null) {
        setGameStatus("홀수/짝수를 선택해주세요!");
        return;
      }

      const isWin =
        (userChoice === "odd" && result % 2 !== 0) ||
        (userChoice === "even" && result % 2 === 0);
      setTimeout(() => {
        setGameStatus(
          isWin ? "승리! 돈을 얻었습니다." : "패배! 돈을 잃었습니다."
        );
      }, 1700);
    },
    [userChoice]
  );

  const rollDice = useCallback(() => {
    const result = rollManipulatedDice();
    if (result !== null) {
      setDiceResult(result);
      checkWinner(result);
      setRolling(true);
      setTimeout(() => {
        setRolling(false);
      }, 800);
    }
  }, [rollManipulatedDice, checkWinner]);

  const handleChoice = useCallback((choice: "odd" | "even") => {
    setUserChoice(choice);
    setGameStatus(`선택한 값: ${choice === "odd" ? "홀수" : "짝수"}`);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // 화면 전체 높이를 차지하도록 설정
          textAlign: "center", // 텍스트 중앙 정렬
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: 3, color: userChoice === null ? "red" : "white" }}
        >
          {gameStatus}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <Button
            variant="outlined"
            color={userChoice === "odd" ? "success" : "primary"}
            onClick={() => handleChoice("odd")}
            sx={{ width: "100px" }}
          >
            홀수
          </Button>
          <Button
            variant="outlined"
            color={userChoice === "even" ? "success" : "primary"}
            onClick={() => handleChoice("even")}
            sx={{ width: "100px" }}
          >
            짝수
          </Button>
        </Box>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <div
            className={`dice ${rolling ? "rolling" : ""} text-black`}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "white",
              border: "2px solid #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "transform 0.8s ease-in",
              transform: rolling ? "rotateY(360deg)" : "rotateY(0deg)",
            }}
          >
            {rolling ? null : diceResult}
          </div>
        </div>

        <Button
          variant="contained"
          color="warning"
          sx={{ padding: "16px 32px", fontSize: "20px", width: "200px" }}
          onClick={rollDice}
        >
          주사위 던지기
        </Button>
      </Box>
    </>
  );
}
