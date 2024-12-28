import AddonCategoryComponent from "@/component/AddonCategoryComponent";
import QuantitySelector from "@/component/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, selectCarts } from "@/store/slices/appSlice";
import { addCart, setCarts, updateCart } from "@/store/slices/cartSlice";
import { addonCategoriesByMenuId, generateRandomId } from "@/utils";
import { Box, Button, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Menu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = router.query;
  const { menus, addons, addonCategories, menusAddonCategories, carts } =
    useAppSelector(appData);
  const menuId = Number(router.query.id);
  const menu = menus.find((item) => item.id === Number(menuId));
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const validAddonCategories = addonCategoriesByMenuId(
    addonCategories,
    menusAddonCategories,
    menuId
  );
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

  useEffect(() => {
    const requiredAddonCategories = validAddonCategories.filter(
      (item) => item.isRequired
    );
    if (requiredAddonCategories.length) {
      if (!selectedAddons.length) {
        setIsDisabled(true);
      } else {
        const requiredAddons = selectedAddons.filter((item) => {
          const addonCategory = validAddonCategories.find(
            (validAddonCategory) =>
              validAddonCategory.id === item.addonCategoryId
          );
          if (addonCategory?.isRequired) {
            return true;
          }
          return false;
        });
        const hasSelectedAllRequiredAddons =
          requiredAddonCategories.length === requiredAddons.length;
        const isDisabled = hasSelectedAllRequiredAddons ? false : true;
        setIsDisabled(isDisabled);
      }
    }
  }, [selectedAddons, validAddonCategories]);

  const addToCart = () => {
    if (!menu) return;
    dispatch(
      addCart({
        id: generateRandomId(),
        menu,
        quantity,
        addons: selectedAddons,
      })
    );
    router.push({ pathname: "/order", query });
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

  const handleQuantityDecrease = () => {
    const newValue = quantity - 1 === 0 ? 1 : quantity - 1;
    setQuantity(newValue);
  };

  const handleQuantityIncrease = () => {
    const newValue = quantity + 1;
    setQuantity(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        p: 4,
      }}
    >
      <Typography variant="h3" sx={{ mb: 2 }}>
        {menu?.name}
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
        onClick={addToCart}
        sx={{ mt: 3, width: "fit-content" }}
      >
        Add to cart
      </Button>
    </Box>
  );
};
export default Menu;
