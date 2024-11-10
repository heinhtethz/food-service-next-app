import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import NavBar from "./NavBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";

interface Props {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: Props) => {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(fetchData());
    }
  }, [data, status, dispatch]);

  return (
    <Box>
      <NavBar title={title} />
      {children}
    </Box>
  );
};

export default Layout;
