import MenuCard from "@/component/MenuCard";
import OrderAppLayout from "@/component/OrderLayout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { menusByMenuCategoryId } from "@/utils";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Locations, MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderApp = () => {
  const router = useRouter();
  const query = router.query;
  const { menuCategories, menus, locations, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const currentLocation = locations.find(
    (item) => item.id === Number(query.locationId)
  ) as Locations;
  const currentAddress = currentLocation?.address;
  const [value, setValue] = useState(0);
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
  if (!currentLocation) return null;
  if (!selectedMenuCategory)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <OrderAppLayout address={currentAddress}>
      <Box sx={{ width: "100vw" }}>
        <Box sx={{ display: "flex" }}>
          <Tabs
            value={value}
            onChange={(evt, value) => setValue(value)}
            variant="scrollable"
            sx={{ width: "100%" }}
          >
            {menuCategories.map((item) => {
              return (
                <Tab
                  key={item.id}
                  label={item.name}
                  onClick={() => setSelectedMenuCategory(item)}
                />
              );
            })}
          </Tabs>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, p: 2 }}>
          {renderMenus()}
        </Box>
      </Box>
    </OrderAppLayout>
  );
};

export default OrderApp;
