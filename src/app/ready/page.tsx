"use client";

import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container } from "@mui/material";
import { Link } from "next-view-transitions";

const HomePage = () => {
  const [userBalance, setUserBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await fetch(`/api/info?id=21112`);
        const data = await response.json();
        setUserBalance(data.user.balance);
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    fetchUserBalance();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#282c34",
        color: "white",
        padding: 2,
      }}
    >
      <Box sx={{ textAlign: "center", marginTop: 3 }}>
        <Typography variant="h3" component="h1">
          TITLE NAME
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          현재 가상화폐 잔액:{" "}
          {userBalance !== null ? userBalance : "Loading..."} BTC
        </Typography>
      </Box>

      <Link href="/game">
        <Button
          variant="contained"
          color="warning"
          sx={{ padding: "16px 32px", fontSize: "20px", width: "200px" }}
        >
          입장하기
        </Button>
      </Link>

      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="body2">게임 설명 및 규칙</Typography>
      </Box>
    </Container>
  );
};

export default HomePage;
