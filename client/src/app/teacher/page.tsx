'use client'
import React from "react";
import MainDashboard from "../components/dashboard/main-dashboard/MainDashboard";
// import { useRouter } from "next/navigation";
// import { useUser } from "src/hooks/useUser";

const page = () => {
  // const router = useRouter()
  // const { user, loading } = useUser()
  // if (loading)
  //   return (<div>Loading</div>)
  // if (!user)
  //   router.replace('/login')

  return (
    <div>
      <MainDashboard />
    </div>
  );
};

export default page;
