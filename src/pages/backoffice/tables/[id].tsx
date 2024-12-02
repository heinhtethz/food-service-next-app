import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeTable, updateTable } from "@/store/slices/tablesSlice";
import { getSelectedLocationId } from "@/utils";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { Tables } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();
  const tableId = router.query.id as string;
  const table = tables.find((item) => item.id === Number(tableId)) as Tables;

  const [editTableName, setEditTableName] = useState<Partial<Tables>>();
  const [open, setOpen] = useState(false);

  const handleUpdateTable = async () => {
    if (!editTableName?.name) return alert("Name is required");
    const response = await fetch(`${config.apiBaseUrl}/tables?id=${tableId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editTableName),
    });
    const responseData = await response.json();
    dispatch(updateTable(responseData));
  };

  const handleDeleteTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables?id=${tableId}`, {
      method: "DELETE",
    });
    dispatch(removeTable(table));
    router.push("/backoffice/tables");
  };

  return (
    <Layout title="Edit Table">
      <Box sx={{ width: 500, margin: "0 auto", mt: 5 }}>
        <TextField
          label="Name"
          defaultValue={table?.name}
          onChange={(evt) => setEditTableName({ name: evt.target.value })}
          fullWidth
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" onClick={handleUpdateTable}>
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Dialog open={open}>
          <DialogContent>
            <Typography variant="h6">
              Are you sure to delete this table?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteTable();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default EditTable;
