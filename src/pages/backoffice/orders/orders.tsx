import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Layout from "@/component/Layout";
import { Fragment, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Menus, Orderlines, Orders, OrderStatus } from "@prisma/client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { config } from "@/config/config";
import { updateOrderline } from "@/store/slices/orderlinesSlice";

function Row(Props: { row: Orders }) {
  const { row } = Props;
  const { orderlines, menus, addons } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const orderId = row.id;
  const isPaid = row.isPaid === true ? "Yes" : "No";
  let orderline = [] as Orderlines[];
  orderlines.forEach((item) => {
    if (!orderline.length) {
      orderline = [item];
    } else {
      const isAlredy = orderline.find(
        (elem) =>
          elem.ramdomMenuId === item.ramdomMenuId &&
          elem.orderId === item.orderId
      );
      if (isAlredy) {
        return;
      } else {
        orderline = [...orderline, item];
      }
    }
  });

  const validOrderline = orderline.filter((item) => item.orderId === orderId);

  const quantity = validOrderline
    .map((item) => item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const menuIdsFromOrderline = validOrderline.map((item) => item.menuId);
  const addonIdsFromOrderline = orderlines
    .filter((item) => item.orderId === orderId)
    .map((item) => item.addonId);
  const validMenu = menus.find((item) =>
    menuIdsFromOrderline.includes(item.id)
  ) as Menus;
  const validAddons = addons.filter((item) =>
    addonIdsFromOrderline.includes(item.id)
  );

  const handleUpdateOrderStatus = async (
    evt: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">
  ) => {
    const response = await fetch(`${config.apiBaseUrl}/orderlines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ramdomMenuId: validOrderline[0].ramdomMenuId,
        status: evt.target.value,
      }),
    });
  };

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {" "}
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {orderId}
        </TableCell>
        <TableCell align="center">{quantity}</TableCell>
        <TableCell align="center">{row.tableId}</TableCell>
        <TableCell align="center">{isPaid}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Orders
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Menus</TableCell>
                    <TableCell align="center">Addons</TableCell>
                    <TableCell align="center">Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" align="center">
                      {validMenu?.name}
                    </TableCell>
                    {validAddons.map((item) => {
                      return (
                        <TableCell
                          key={item.id}
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {item.name}
                        </TableCell>
                      );
                    })}
                    <TableCell align="right">
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <FormControl sx={{ width: 200 }}>
                          <InputLabel>Status</InputLabel>
                          <Select
                            defaultValue={validOrderline[0].orderStatus}
                            label="Status"
                            onChange={handleUpdateOrderStatus}
                          >
                            <MenuItem value={OrderStatus.PENDING}>
                              Pending
                            </MenuItem>
                            <MenuItem value={OrderStatus.PREPARING}>
                              Preparing
                            </MenuItem>
                            <MenuItem value={OrderStatus.COMPLETE}>
                              Complete
                            </MenuItem>
                            <MenuItem value={OrderStatus.REJECTED}>
                              Reject
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

export default function Order() {
  const { orders } = useAppSelector(appData);

  return (
    <Layout title="Orders">
      <Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead sx={{ bgcolor: "#E0493A", color: "white" }}>
              <TableRow>
                <TableCell />
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  OrderId
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Number of menus
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  TableId
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Paid
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
}
