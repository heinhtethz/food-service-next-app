import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getNumberOfMenusByOrderId,
  getSelectedLocationId,
  orderlinesByRamdomMenuId,
} from "@/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Addons,
  AddonCategories,
  Menus,
  Orders,
  OrderStatus,
  Orderlines,
} from "@prisma/client";
import { useContext, useState } from "react";

interface Props {
  menus: Menus[];
  addonCategories: AddonCategories[];
  addons: Addons[];
  order: Orders;
  orderlines: Orderlines[];
}

const Row = ({ order, orderlines, menus, addons, addonCategories }: Props) => {
  const [open, setOpen] = useState(false);

  const ramdomMenuIds: string[] = [];
  orderlines.forEach((item) => {
    const hasAdded = ramdomMenuIds.includes(item.ramdomMenuId);
    if (!hasAdded) ramdomMenuIds.push(item.ramdomMenuId);
  });

  const renderMenusAddonsFromOrder = () => {
    const orderlineMenus = ramdomMenuIds.map((ramdomMenuId) => {
      const orderlineAddonIds = orderlines
        .filter((item) => item.ramdomMenuId === ramdomMenuId)
        .map((item) => item.addonId);
      // addon
      const orderlineAddons = addons.filter((item) =>
        orderlineAddonIds.includes(item.id)
      );
      // menu
      const orderlineMenuIds = orderlines
        .filter((item) => item.ramdomMenuId === ramdomMenuId)
        .map((item) => item.menuId);
      const orderlineMenu = menus.find((item) =>
        orderlineMenuIds.includes(item.id)
      ) as Menus;
      // status
      const status = orderlines.find(
        (item) => item.ramdomMenuId === String(ramdomMenuId)
      )?.orderStatus;
      // quantiy
      const quantity = orderlines.find(
        (item) => item.ramdomMenuId === String(ramdomMenuId)
      )?.quantity;
      // find respective addons' addoncategories
      const addonsWithCategories: { [key: number]: Addons[] } = {};
      orderlineAddons.forEach((item) => {
        const addonCategory = addonCategories.find(
          (addonCategory) => addonCategory.id === item.addonCategoryId
        ) as AddonCategories;
        if (!addonsWithCategories[addonCategory.id]) {
          addonsWithCategories[addonCategory.id] = [item];
        } else {
          addonsWithCategories[addonCategory.id] = [
            ...addonsWithCategories[addonCategory.id],
            item,
          ];
        }
      });

      return {
        menu: orderlineMenu,
        addonsWithCategories,
        status,
        quantity,
        ramdomMenuId,
      };
    });

    return orderlineMenus.map((item) => (
      <Box key={item.menu?.id} sx={{ mr: 2 }}>
        <Paper
          elevation={3}
          sx={{
            width: 250,
            height: 300,
            p: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">{item.menu?.name}</Typography>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: "#1B9C85",
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  {item.quantity}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{
                  maxHeight: "180px",
                }}
              >
                {Object.keys(item.addonsWithCategories).map(
                  (addonCategoryId) => {
                    const addonCategory = addonCategories.find(
                      (item) => item.id === Number(addonCategoryId)
                    ) as AddonCategories;
                    const addons = item.addonsWithCategories[
                      Number(addonCategoryId)
                    ] as Addons[];
                    return (
                      <Box sx={{ mb: 1.5 }} key={addonCategoryId}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {addonCategory.name}
                        </Typography>
                        <Box sx={{ pl: 2 }}>
                          {addons.map((item) => {
                            return (
                              <Box key={item.id}>
                                <Typography
                                  variant="body1"
                                  sx={{ fontStyle: "italic" }}
                                >
                                  {item.name}
                                </Typography>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    );
                  }
                )}
              </Box>
            </Box>
            <Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: "100%" }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    defaultValue={item.status}
                    label="Status"
                    onChange={(evt) =>
                      handleUpdateOrderStatus(evt, item.ramdomMenuId)
                    }
                  >
                    <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                    <MenuItem value={OrderStatus.PREPARING}>Preparing</MenuItem>
                    <MenuItem value={OrderStatus.COMPLETE}>Complete</MenuItem>
                    <MenuItem value={OrderStatus.REJECTED}>Reject</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    ));
  };

  const handleUpdateOrderStatus = async (
    evt: SelectChangeEvent<"PENDING" | "PREPARING" | "COMPLETE" | "REJECTED">,
    ramdomMenuId: string
  ) => {
    await fetch(`${config.apiBaseUrl}/orderlines`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ramdomMenuId, status: evt.target.value }),
    });
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{order.id}</TableCell>
        <TableCell align="right">
          {getNumberOfMenusByOrderId(orderlines, order.id)}
        </TableCell>
        <TableCell align="right">{order.tableId}</TableCell>
        <TableCell align="right">{order.isPaid ? "Yes" : "No"}</TableCell>
        <TableCell align="right">{order.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit sx={{ my: 2 }}>
            <Box sx={{ display: "flex" }}>{renderMenusAddonsFromOrder()}</Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OrderPage = () => {
  const { orders, orderlines, menus, addons, addonCategories } =
    useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const dispatch = useAppDispatch();
  const currentLocationOrders = orders.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  const getOrderlinesByOrderId = (orderId: number) => {
    return orderlines.filter((item) => item.orderId === orderId);
  };

  return (
    <Layout title="Orders">
      <TableContainer component={Paper} sx={{ maxHeight: "100%vw" }}>
        <Table aria-label="collapsible table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">Order Id</TableCell>
              <TableCell align="right">No. of menus</TableCell>
              <TableCell align="right">Table Id</TableCell>
              <TableCell align="right">Paid</TableCell>
              <TableCell align="right">Total price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLocationOrders.map((order) => (
              <Row
                key={order.id}
                menus={menus}
                addonCategories={addonCategories}
                addons={addons}
                order={order}
                orderlines={getOrderlinesByOrderId(order.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default OrderPage;
