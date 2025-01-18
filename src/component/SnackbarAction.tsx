import { Alert, Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

const SnackbarAction = ({ open, setOpen, message }: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message!}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAction;
