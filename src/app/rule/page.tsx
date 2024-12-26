"use client";
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RulePage() {
  const router = useRouter();
  return (
    <>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          에라이
        </Typography>
        <Typography variant="body1">
          시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌
        </Typography>
      </Container>
      <Container sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          개같은
        </Typography>
        <Typography variant="body1">
          시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌
        </Typography>
      </Container>
      <Container sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          동아리
        </Typography>
        <Typography variant="body1">
          시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌
        </Typography>
      </Container>
      <Container sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          다시는 안한다
        </Typography>
        <Typography variant="body1">
          시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌시이이이이이이이이벌
        </Typography>
      </Container>
      <Container sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/ready")}
        >
          처음으로
        </Button>
      </Container>
    </>
  );
}
