import MenuCard from "@/component/MenuCard";
import ViewCartBar from "@/component/viewCartBar";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { menusByMenuCategoryId } from "@/utils";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderApp = () => {
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = Number(query.locationId);
  const { menuCategories, menus, locations, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>();

  useEffect(() => {
    if (menuCategories.length) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);

  const renderMenus = () => {
    const isValid = selectedLocationId && selectedMenuCategory;
    if (!isValid) return;
    const menuCategoryId = selectedMenuCategory.id as number;
    const validMenus = menusByMenuCategoryId(
      menusMenuCategoriesLocations,
      menus,
      menuCategoryId,
      selectedLocationId
    );

    return validMenus.map((item) => {
      const href = { pathname: `/order/menus/${item.id}`, query };
      return <MenuCard key={item.id} menu={item} href={href} />;
    });
  };

  if (!selectedMenuCategory) return null;
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(evt, value) => setValue(value)}
          variant="scrollable"
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
      <Box sx={{ display: "flex", flexWrap: "wraps", columnGap: 3, p: 3 }}>
        {renderMenus()}
      </Box>
      <ViewCartBar />
    </Box>
  );
};

export default OrderApp;
