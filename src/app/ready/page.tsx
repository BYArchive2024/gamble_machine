"use client";

import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Container, Grid2 } from "@mui/material";
import { useCookies } from "next-client-cookies";
import { Link } from "next-view-transitions";

const HomePage = () => {
  const [userBalance, setUserBalance] = useState<string | null>(null);
  const cookies = useCookies();

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await fetch(`/api/info?id=${await cookies.get("id")}`);
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
      <Box
        sx={{
          textAlign: "center",
          marginTop: 3,
          fontFamily: "Paperlogy-8ExtraBold",
        }}
      >
        <Typography
          sx={{ fontFamily: "Paperlogy-8ExtraBold" }}
          variant="h3"
          component="h1"
        >
          Archive 도박장
        </Typography>
        <Typography
          variant="h6"
          sx={{ marginTop: 2, fontFamily: "Paperlogy-8ExtraBold" }}
        >
          현재 가상화폐 잔액:{" "}
          {userBalance !== null ? userBalance : "Loading..."} KBC
        </Typography>
      </Box>

      <Grid2
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Link href="/game">
          <Button
            variant="contained"
            color="warning"
            sx={{
              padding: "16px 32px",
              fontSize: "20px",
              width: "200px",
              fontFamily: "Paperlogy-8ExtraBold",
            }}
          >
            입장하기
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "16px 32px",
              fontSize: "20px",
              width: "200px",
              fontFamily: "Paperlogy-8ExtraBold",
            }}
          >
            홈으로
          </Button>
        </Link>
      </Grid2>

      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Link href="/rule">
          <Typography
            variant="body2"
            style={{
              color: "skyblue",
              fontFamily: "Paperlogy-8ExtraBold",
            }}
          >
            게임 설명 및 규칙
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default HomePage;
