"use client";
import { Container, Typography, Button } from "@mui/material";
import { useTransitionRouter } from "next-view-transitions";

export default function RulePage() {
  const router = useTransitionRouter();
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontFamily: "Paperlogy-8ExtraBold" }}
        >
          게임 규칙
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            whiteSpace: "pre-line",
            fontFamily: "Paperlogy-8ExtraBold",
          }}
        >
          {
            "1. 게임은 5개의 난이도로 구성되어 있습니다.\n2. 각 난이도는 다른 난이도의 퍼즐을 제공합니다.\n3. 퍼즐은 랜덤한 위치에 다른 문자가 들어가 있습니다.\n4. 퍼즐을 풀기 위해서는 주어진 시간 내에 다른 글자를 클릭해야 합니다.\n5. 정답을 클릭하면 다음 라운드로 넘어가거나 멈출 수 있습니다.\n6. 시간 내에 정답을 클릭하지 못하면 돈을 0.5배 깎이고 게임이 종료됩니다."
          }
        </Typography>
        <Typography
          variant="h3"
          sx={{ mt: 5, fontWeight: "bold", fontFamily: "Paperlogy-8ExtraBold" }}
        >
          주의사항 및 안내사항
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            whiteSpace: "pre-line",
            fontFamily: "Paperlogy-8ExtraBold",
          }}
        >
          {
            "1.다른 글자가 생성되는 위치는 의사 난수를 이용한 것으로, 완벽한 무작위 값을 가지지 않습니다.\nPRNG(pseudo-random number generator) algorithm 사용\n2. 환불 X\n3. 각 라운드 배율은 다음과 같습니다.\n"
          }
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            whiteSpace: "pre-line",
            ml: 2,
            fontFamily: "Paperlogy-8ExtraBold",
          }}
        >
          {
            "1라운드: 1.5배\n2라운드: 1.2배\n3라운드: 1.5배\n4라운드: 2배\n5라운드: 5배"
          }
        </Typography>
      </Container>
      <Container sx={{ mt: 3, fontFamily: "Paperlogy-8ExtraBold" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/ready")}
        >
          규칙을 완수했습니다.
        </Button>
      </Container>
    </>
  );
}
