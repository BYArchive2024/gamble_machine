import { Typography } from "@mui/material";

export default function Countdown({ countdown }: { countdown: number }) {
  return (
    <div className={`flex flex-col gap-10`}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ whiteSpace: "pre-line", fontFamily: "Paperlogy-8ExtraBold" }}
      >
        {`제한시간 안에\n다르게 적힌 글자를 찾아주세요!`}
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ fontSize: "20px", fontFamily: "Paperlogy-8ExtraBold" }}
      >
        게임이 곧 시작됩니다: {countdown}
      </Typography>
    </div>
  );
}
