import { store } from "@/store";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/global.css";
import { useEffect } from "react";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import { useAppSelector } from "@/store/hooks";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(fetchData());
  }, []);

  return (
    <SessionProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
