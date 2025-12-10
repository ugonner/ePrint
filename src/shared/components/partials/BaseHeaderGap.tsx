import { Capacitor } from "@capacitor/core";
import { useLocation } from "react-router";

export const BaseHeaderGap = () => {
  const {pathname} = useLocation();
  const isHome = /\/home/i.test(pathname);
    return Capacitor.isNativePlatform() || !isHome ? <div style={{ height: "70px" }}> &nbsp; </div> : <></>;
};
