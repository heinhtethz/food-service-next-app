import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Paper, Typography } from "@mui/material";
import { Orders } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const query = router.query;
  const orderId = router.query.id as string;
  const { orders } = useAppSelector(appData);
  const order = orders.find((item: Orders) => item.id === Number(orderId));

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order, query, router]);
  if (!order) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Paper sx={{ width: 500 }}>
        <Typography variant="h5">orderId: {order.id}</Typography>
        <Typography variant="h5">price: {order.price}</Typography>
        <Typography variant="h5">tableId: {order.tableId}</Typography>
      </Paper>
    </Box>
  );
};

export default ActiveOrder;
