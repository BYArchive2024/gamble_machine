"use client";
import { AlertDialog } from "@/components/dialog";
import { Typography, TextField } from "@mui/material";
import { useTransitionRouter } from "next-view-transitions";
import { KeyboardEvent, ChangeEvent, useCallback, useState } from "react";

export default function Main() {
  const router = useTransitionRouter();
  const [dialogState, setDialogState] = useState({
    blank: false,
  });
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = useCallback(async () => {
    try {
      if (!name || !id)
        return setDialogState((prev) => ({ ...prev, blank: true }));
      await fetch(`/api/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      }).then(async (e) => {
        const { success } = await e.json();
        if (!success) {
          await fetch("api/sign", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, name: name, balance: 0 }),
          });
        }
      });

      router.push("/ready");
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, [router, id, name]);

  const handleIdChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      if (e.target.value.length > 5) return;
      setId(e.target.value);
    },
    []
  );

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value;
      if (/^[ㄱ-ㅎ가-힣\b]*$/.test(value)) setName(value);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSubmit(),
    [handleSubmit]
  );

  return (
    <div className="m-3 h-[calc(100vh-1.5rem)] flex items-center font-paperlogy">
      <div className="grid grid-cols-1 gap-3 w-full">
        <AlertDialog
          title="경고"
          content="빈칸 없이 모두 입력해주십시오."
          open={dialogState.blank}
          ishome={true}
          setClose={() =>
            document.startViewTransition(() =>
              setDialogState((prev) => ({ ...prev, blank: false }))
            )
          }
        />
        <Typography
          sx={{ fontFamily: "Paperlogy-8ExtraBold" }}
          className="text-indigo-400"
          variant="h4"
          textAlign="center"
        >
          로그인
        </Typography>
        <TextField
          type="number"
          value={id}
          onChange={handleIdChange}
          label="학번"
          className="mt-4"
          slotProps={{
            input: {
              sx: {
                borderRadius: "0.75rem !important",
                fontFamily: "Paperlogy-8ExtraBold",
              },
            },
          }}
        />
        <TextField
          type="text"
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          label="이름"
          className="mt-2"
          slotProps={{
            input: {
              sx: {
                borderRadius: "0.75rem !important",
                fontFamily: "Paperlogy-8ExtraBold",
              },
            },
          }}
        />
        <div
          className="mt-3 text-center p-3 text-xl text-black bg-purple-300 rounded-xl cursor-pointer select-none hover:bg-purple-400"
          onClick={() => handleSubmit()}
        >
          확인
        </div>
      </div>
    </div>
  );
}
