import { Box } from "@mui/material";
import { ReactNode } from "react";
import NavBar from "./NavBar";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: Props) => {
  const { isLoading } = useAppSelector((state) => state.app);
  if (isLoading) return null;

  return (
    <Box>
      <NavBar title={title} />
      {children}
    </Box>
  );
};

export default Layout;
