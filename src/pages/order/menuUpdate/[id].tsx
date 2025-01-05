import AddonCategoryComponent from "@/component/AddonCategoryComponent";
import OrderAppLayout from "@/component/OrderLayout";
import QuantitySelector from "@/component/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateCart } from "@/store/slices/cartSlice";
import { addonCategoriesByMenuId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const MenuUpdate = () => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const { addons, addonCategories, menusAddonCategories, carts } =
    useAppSelector(appData);
  const cartItemId = router.query.id as string;
  const cartItem = carts.find((item) => item.id === cartItemId);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const validAddonCategories = cartItem
    ? addonCategoriesByMenuId(
        addonCategories,
        menusAddonCategories,
        cartItem?.menu.id
      )
    : [];
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

  const updateCarts = () => {
    if (!cartItem) return;
    const newCartItems = {
      id: cartItemId,
      menu: cartItem.menu,
      addons: selectedAddons,
      quantity: quantity,
    };

    dispatch(updateCart(newCartItems));
    router.push({ pathname: "/order/cart", query });
  };

  const handleAddonSelect = (selected: boolean, addon: Addons) => {
    const addonCategory = addonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategories;
    if (addonCategory.isRequired) {
      const addonWtihSameAddonCategory = selectedAddons.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      let newSelectedAddons: Addons[] = [];
      if (addonWtihSameAddonCategory) {
        const filteredAddons = selectedAddons.filter(
          (item) => item.id !== addonWtihSameAddonCategory.id
        );
        newSelectedAddons = [...filteredAddons, addon];
      } else {
        newSelectedAddons = [...selectedAddons, addon];
      }
      setSelectedAddons(newSelectedAddons);
    } else {
      if (selected) {
        setSelectedAddons([...selectedAddons, addon]);
      } else {
        setSelectedAddons([
          ...selectedAddons.filter(
            (selectedAddon) => selectedAddon.id !== addon.id
          ),
        ]);
      }
    }
  };

  useEffect(() => {
    if (cartItem) {
      const selectedAddon = carts.find((item) => item.id === cartItem.id)
        ?.addons as Addons[];
      setSelectedAddons(selectedAddon);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem, carts]);

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  return (
    <OrderAppLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          {cartItem?.menu?.name}
        </Typography>
        <AddonCategoryComponent
          validAddonCategories={validAddonCategories}
          validAddons={validAddons}
          selectedAddons={selectedAddons}
          onChange={(checked, item) => handleAddonSelect(checked, item)}
        />
        <QuantitySelector
          value={quantity}
          onDecrease={handleQuantityDecrease}
          onIncrease={handleQuantityIncrease}
        />
        <Button
          variant="contained"
          disabled={isDisabled}
          onClick={updateCarts}
          sx={{ mt: 3, width: "fit-content" }}
        >
          Update
        </Button>
      </Box>
    </OrderAppLayout>
  );
};
export default MenuUpdate;
