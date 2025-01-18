import { config } from "@/config/config";
import { useAppDispatch } from "@/store/hooks";
import { addTable } from "@/store/slices/tablesSlice";
import { getSelectedLocationId } from "@/utils";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTable = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [newTable, setNewTable] = useState({ name: "" });
  const selectedLocationId = getSelectedLocationId();

  const createNewTable = async () => {
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newTable,
        locationId: Number(selectedLocationId),
      }),
    });
    const responseData = await response.json();
    dispatch(addTable(responseData));
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Table</DialogTitle>
      <DialogContent sx={{ width: 400 }}>
        <form onSubmit={createNewTable}>
          <TextField
            placeholder="Table name"
            fullWidth
            onChange={(evt) => {
              setNewTable({ name: evt.target.value });
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={createNewTable}>
              Create
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTable;
