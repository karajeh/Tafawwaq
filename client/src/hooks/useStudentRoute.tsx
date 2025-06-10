"use client";
import { usePathname } from "next/navigation";

const useStudentRoute = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/student")) {
    return true;
  } else {
    return false;
  }
};

export default useStudentRoute;
