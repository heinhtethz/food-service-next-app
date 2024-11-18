import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackofficeApp = () => {
  const { status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (status === "authenticated") {
      !isLoading && router.push("/backoffice/orders");
    } else {
      router.push("/auth/signin");
    }
  }, [router, status, isLoading]);

  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return null;
};

export default BackofficeApp;
