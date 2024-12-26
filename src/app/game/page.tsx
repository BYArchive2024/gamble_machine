"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Container } from "@mui/material";
import Countdown from "@/components/countdown";
import Puzzle from "@/components/puzzle";

export default function GamePage() {
  const [count, setCount] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const callback = useCallback(
    (id: NodeJS.Timeout) => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        clearInterval(id);
        setGameStarted(true);
      }
    },
    [count]
  );
  useEffect(() => {
    let id = setInterval(() => callback(id), 1000);
    return () => clearInterval(id);
  }, [callback]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      {!gameStarted ? <Countdown countdown={count} /> : <Puzzle />}
    </Container>
  );
}
