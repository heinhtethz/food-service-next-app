import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackofficeApp = () => {
  const { status } = useSession();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.app);

  useEffect(() => {
    if (status === "authenticated") {
      !isLoading && router.push("/backoffice/orders");
      return;
    }
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router, isLoading]);

  return null;
};

export default BackofficeApp;
