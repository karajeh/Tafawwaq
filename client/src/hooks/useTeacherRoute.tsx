"use client";
import { usePathname } from "next/navigation";

const useTeacherRoute = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/teacher")) {
    return true;
  } else {
    return false;
  }
};

export default useTeacherRoute;
