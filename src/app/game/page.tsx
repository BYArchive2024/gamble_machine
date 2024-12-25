"use client";

import { useEffect, useState, useRef } from "react";
import { Container } from "@mui/material";
import Countdown from "@/components/countdown";
import Puzzle from "@/components/puzzle";

export default function GamePage() {
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.js", import.meta.url));
    workerRef.current.postMessage({ type: "startTimer", value: 3000 });

    workerRef.current.onmessage = (event) => {
      if (event.data.type === "updateTime") {
        setCountdown(event.data.value / 1000);
      } else if (event.data.type === "timeout") {
        setGameStarted(true);
      }
    };
  }, []);

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
      {!gameStarted ? <Countdown countdown={countdown} /> : <Puzzle />}
    </Container>
  );
}
