import OrderAppLayout from "@/component/OrderLayout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeallCartItem, removeCart } from "@/store/slices/cartSlice";
import { addOrder } from "@/store/slices/ordersSlice";
import { CartItem } from "@/typings";
import { getCartTotalPrice } from "@/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Review = () => {
  const { carts } = useAppSelector(appData);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = router.query;
  const locationId = query.locationId as string;
  const tableId = query.tableId as string;

  useEffect(() => {
    if (!carts.length) {
      const query = router.query;
      const isValid = query.locationId && query.tableId;
      isValid && router.push({ pathname: "/order", query });
    }
  }, [carts.length, router]);

  const renderAddons = (addons: Addons[]) => {
    if (!addons.length) return;
    return addons.map((item) => {
      return (
        <Box
          key={item.id}
          sx={{
            maxWidth: "1024px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{item.name}</Typography>
          <Typography>{item.price}</Typography>
        </Box>
      );
    });
  };

  const removeCartItem = (cartItem: CartItem) => {
    const removingCartItem = carts.find(
      (item) => item.id === cartItem.id
    ) as CartItem;
    dispatch(removeCart(removingCartItem));
  };

  const confirmOrder = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/orders?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carts }),
      }
    );
    const responseJSON = await response.json();
    if (response.ok) {
      dispatch(removeallCartItem());
      dispatch(addOrder(responseJSON));
      router.push({
        pathname: `/order/activeOrder/${responseJSON.id}`,
        query,
      });
    }
  };

  if (!carts.length) return null;

  return (
    <OrderAppLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "500px" },
          }}
        >
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
          >
            Review your order
          </Typography>
          {carts.map((cartItem, index) => {
            const { menu, addons, quantity } = cartItem;
            return (
              <Box key={index}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      width: 25,
                      height: 25,
                      mr: 1,
                      backgroundColor: "green",
                    }}
                  >
                    {quantity}
                  </Avatar>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">{menu.name}</Typography>
                    <Typography variant="h6">{menu.price}</Typography>
                  </Box>
                </Box>
                <Box sx={{ pl: 6 }}>{renderAddons(addons)}</Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3,
                    mt: 1,
                  }}
                >
                  <DeleteIcon
                    sx={{ mr: 2, cursor: "pointer" }}
                    onClick={() => removeCartItem(cartItem)}
                  />
                  <EditIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      router.push({
                        pathname: `menuUpdate/${cartItem.id}`,
                        query: router.query,
                      })
                    }
                  />
                </Box>
              </Box>
            );
          })}
          <Divider />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total : {getCartTotalPrice(carts)}
            </Typography>
          </Box>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="contained" onClick={() => confirmOrder()}>
              Confirm order
            </Button>
          </Box>
        </Box>
      </Box>
    </OrderAppLayout>
  );
};

export default Review;
