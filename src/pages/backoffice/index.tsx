import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackofficeApp = () => {
  const { status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);
  const { locations } = useAppSelector(appData);
  const locationIdFromLocalStorage = getSelectedLocationId();

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
  return null;
};

export default BackofficeApp;
