import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grow,
  IconButton,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "next-view-transitions";

interface AlertProps {
  title: string;
  open: boolean;
  content: string;
  ishome?: boolean;
  setClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export function AlertDialog({
  title,
  open,
  content,
  ishome,
  setClose,
}: AlertProps) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
        },
        backdropFilter: "blur(3px)",
      }}
    >
      <div className="flex justify-between items-center">
        <DialogTitle
          sx={{
            fontFamily: "Paperlogy-8ExtraBold",
            display: "flex",
            justifyContent: "center",
            padding: "8px 10px",
            fontSize: "25px",
          }}
        >
          {title}
        </DialogTitle>
        <IconButton onClick={setClose}>
          <CancelIcon
            color="error"
            fontSize="large"
            sx={{ cursor: "pointer" }}
          />
        </IconButton>
      </div>
      <Divider />
      <DialogContent sx={{ padding: "10px 20px" }}>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ fontFamily: "Paperlogy-8ExtraBold" }}
        >
          {content}
        </Typography>
      </DialogContent>
      {!ishome && (
        <DialogActions>
          <Link href="/">
            <Button
              variant="outlined"
              color="error"
              sx={{ fontFamily: "Paperlogy-8ExtraBold" }}
            >
              홈으로 가기
            </Button>
          </Link>
        </DialogActions>
      )}
    </Dialog>
  );
}
