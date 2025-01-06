import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Orders } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import OrderAppLayout from "@/component/OrderLayout";

const ActiveOrder = () => {
  const router = useRouter();
  const query = router.query;
  const { orders } = useAppSelector(appData);
  const orderId = Number(query.id);
  const order = orders.find((item) => item.id === orderId) as Orders;

  useEffect(() => {
    if (!order) {
      router.push({ pathname: "/order", query });
    }
  }, [order, router, query]);

  if (!order) return <CircularProgress />;

  return (
    <OrderAppLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Paper sx={{ width: "500px" }}>
          <Typography variant="h5">orderId: {order.id}</Typography>
          <Typography variant="h5">price: {order.price}</Typography>
          <Typography variant="h5">tableId: {order.tableId}</Typography>
        </Paper>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", mt: 3, columnGap: 1 }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => alert("Boucher is printed successfully")}
        >
          Print
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => router.push({ pathname: "/order", query })}
        >
          No Print
        </Button>
      </Box>
    </OrderAppLayout>
  );
};

export default ActiveOrder;
