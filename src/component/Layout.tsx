import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import NavBar from "./NavBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: Props) => {
  const { isLoading, init } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      dispatch(fetchData({ locationId: undefined }));
    }
  }, [dispatch, init]);

  if (isLoading) return null;
  return (
    <Box>
      <NavBar title={title} />
      {children}
    </Box>
  );
};

export default Layout;
