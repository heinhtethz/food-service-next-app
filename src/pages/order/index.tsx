import MenuCard from "@/component/MenuCard";
import OrderAppLayout from "@/component/OrderLayout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { menusByMenuCategoryId } from "@/utils";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import { Locations, MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderApp = () => {
  const router = useRouter();
  const { query } = router;

  const { menuCategories, menus, locations, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const currentLocation = locations.find(
    (item) => item.id === Number(query.locationId)
  ) as Locations;
  const currentAddress = currentLocation?.address;
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenus = () => {
    const isValid = currentLocation.id && selectedMenuCategory;
    if (!isValid) return;
    const menuCategoryId = selectedMenuCategory.id as number;
    const validMenus = menusByMenuCategoryId(
      menusMenuCategoriesLocations,
      menus,
      menuCategoryId,
      currentLocation.id
    );

    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  return (
    <OrderAppLayout
      address={currentAddress}
      setSelectedMenuCategory={setSelectedMenuCategory}
    >
      {selectedMenuCategory ? (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              flexWrap: "wrap",
              gap: 3,
              mt: 2,
              px: 3,
            }}
          >
            {renderMenus()}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </OrderAppLayout>
  );
};

export default OrderApp;
