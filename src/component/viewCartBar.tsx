import { useAppSelector } from "@/store/hooks";
import { appData, selectCarts } from "@/store/slices/appSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

const ViewCartBar = () => {
  const router = useRouter();
  const { carts } = useAppSelector(appData);
  const cartText = `You have ${carts.length} item in cart.`;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          backgroundColor: "lightblue",
          width: "100%",
          py: 2,
          cursor: "pointer",
        }}
      >
        <Box
          onClick={() =>
            router.push({ pathname: "/order/cart", query: router.query })
          }
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: "40px", color: "blue" }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", color: "green" }}
          >
            {cartText}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewCartBar;
