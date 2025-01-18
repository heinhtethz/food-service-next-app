import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import NavBar from "./NavBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: Props) => {
  const { isLoading, init } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector(appData);
  const locationIdFromLocalStorage = getSelectedLocationId();

  useEffect(() => {
    if (!init) {
      dispatch(fetchData({ locationId: undefined }));
    }
  }, [dispatch, init]);

  useEffect(() => {
    if (locations.length) {
      if (!locationIdFromLocalStorage) {
        const firstLocationId = String(locations[0].id);
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("selectedLocationId", firstLocationId);
        }
      }
    }
  }, [locations, locationIdFromLocalStorage]);

  if (isLoading) return null;
  return (
    <Box>
      <NavBar title={title} />
      {children}
    </Box>
  );
};

export default Layout;
