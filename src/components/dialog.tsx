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

interface AlertProps {
  title: string;
  open: boolean;
  content: string;
  ishome?: boolean;
  setClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export function AlertDialog({
  title,
  open,
  content,
  setClose,
  onConfirm,
  onCancel,
}: AlertProps) {
  return (
    <Dialog
      closeAfterTransition={false}
      open={open}
      TransitionComponent={Transition}
      keepMounted
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
        {!onCancel && !onConfirm && (
          <IconButton onClick={setClose}>
            <CancelIcon
              color="error"
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
          </IconButton>
        )}
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
      <DialogActions>
        {onCancel && (
          <Button
            variant="outlined"
            color="error"
            sx={{ fontFamily: "Paperlogy-8ExtraBold" }}
            onClick={onCancel}
          >
            그만두기
          </Button>
        )}
        {onConfirm && (
          <Button
            variant="outlined"
            color="primary"
            sx={{ fontFamily: "Paperlogy-8ExtraBold" }}
            onClick={onConfirm}
          >
            다음 라운드
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
