import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grow,
  IconButton,
  Link,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useState, forwardRef, useEffect, useCallback } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

export interface Options {
  handle: string;
  defaultValue: string;
  value: string[];
}

export interface Option {
  handle: string;
  value: string;
}

interface OptionProps {
  title: string;
  content: string;
  open: boolean;
  submit: (options: Option[]) => void;
  setClose: () => void;
  options: Options[];
}

interface AlertProps {
  title: string;
  open: boolean;
  content: string;
  submit?: boolean;
  action?: () => void;
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
  submit,
  setClose,
  action,
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
      <DialogContent sx={{ padding: "10px 20px" }}>{content}</DialogContent>
      {submit && (
        <DialogActions>
          {action ? (
            <Button variant="outlined" color="error" onClick={action}>
              확인
            </Button>
          ) : (
            <Link href="/">
              <Button variant="outlined" color="error">
                확인
              </Button>
            </Link>
          )}
          <Button variant="outlined" color="inherit" onClick={setClose}>
            취소
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

export function OptionDialog({
  title,
  content,
  open,
  submit,
  setClose,
  options,
}: OptionProps) {
  const [initializedOptions, setInitializedOptions] = useState<Option[]>([]);

  useEffect(() => {
    const initOptions = options.map((opt) => ({
      handle: opt.handle,
      value: opt.defaultValue,
    }));
    setInitializedOptions(initOptions);
  }, [options]);

  const handleChange = useCallback((handle: string, value: string) => {
    setInitializedOptions((prevOptions) =>
      prevOptions.map((opt) =>
        opt.handle === handle ? { ...opt, value } : opt
      )
    );
  }, []);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setClose}
      sx={{
        "& .MuiDialog-container .MuiPaper-root": {
          width: "300px",
        },
        "& .MuiDialog-paper": {
          borderRadius: "7px",
        },
        backdropFilter: "blur(3px)",
      }}
    >
      <DialogTitle sx={{ textAlign: "center", fontSize: "25px" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        {`제품명: ${content}`}
      </DialogContent>

      <Divider />
      {options.map((opt, i) => (
        <div key={i} className="flex justify-center">
          <FormControl sx={{ padding: "10px", userSelect: "none" }}>
            <FormLabel id={`radio-group-${i}`}>{opt.handle}</FormLabel>
            <RadioGroup
              row
              value={
                initializedOptions.find(
                  (option) => option.handle === opt.handle
                )?.value || ""
              }
              onChange={(e) => handleChange(opt.handle, e.target.value)}
            >
              {opt.value.map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio />}
                  label={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      ))}
      <DialogActions>
        <Button variant="outlined" color="error" onClick={setClose}>
          취소
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => submit(initializedOptions)}
        >
          완료
        </Button>
      </DialogActions>
    </Dialog>
  );
}
