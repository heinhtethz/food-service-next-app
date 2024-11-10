import { useAppDispatch } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackofficeApp = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/orders");
    }
  }, [router, status]);
  return null;
};

export default BackofficeApp;
