"use client";
import { usePathname } from "next/navigation";

const useAdminRoute = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return true;
  }else{
    return false;
  }
};

export default useAdminRoute;
