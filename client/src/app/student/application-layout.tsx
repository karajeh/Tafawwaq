"use client";
import logo from "public/images/logo.svg";
import avatar from "public/images/session-oversight/avatar.svg";
// import down from "public/images/dashnav/down.svg";
import { Navbar, NavbarSection } from "../components/admin-panel/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "../components/admin-panel/ui/sidebar";
import { SidebarLayout } from "../components/admin-panel/ui/sidebar-layout";
import { Squares2X2Icon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
// import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  AcademicCapIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/16/solid";
import {
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineSettings,
  // MdPayments,
} from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
// import { useDisableDashboard } from "../../store/disableDashboard";

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  // const { isDisabled } = useDisableDashboard();
  return (
    <SidebarLayout
      navbar={
        <Navbar className="">
          {/* <NavbarSpacer /> */}
          <NavbarSection>
            <div className="px-2">
              <p className="text-xl text-[#000000]">
                {pathnameNames[pathname]}
              </p>
            </div>
            <div className=" w-[95.2%] py-2 px-2 ">
              <DashboardHeader />
            </div>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar className="relative">
          <SidebarHeader className="w-full flex items-center justify-center font-medium">
            <div className="flex flex-col items-center">
              <Image src={logo} width={60} height={60} alt="Logo" />
              <div className="mt-[24px] md:mt-[28px]" onClick={toggleDropdown}>
                <div className="flex items-center gap-4 md:gap-5 ">
                  <Image src={avatar} alt="avatar" width={38} height={40} />
                  <div className="flex items-center gap-2 md:gap-3">
                    <div>
                      <h1 className="text-[13px]">Abeeda Alex</h1>
                      <h1 className="text-[14px] font-semibold text-[#707070]">
                        Student
                      </h1>
                    </div>
                    {/* <Image src={down} alt="avatar" /> */}
                    {/* <div className="relative inline-block"> */}
                    {/* Arrow icon */}
                    {/* <button className="bg-none border-none cursor-pointer">
                        <Image
                          src={down}
                          alt="avatar"
                          className="w-5 h-5 hover:scale-150 transition-all"
                        />
                      </button> */}

                    {/* Dropdown Menu */}
                    {/* {isOpen && (
                        <div className="absolute  top-8  right-0 bg-white rounded shadow-lg z-50">
                          <div className="flex flex-col p-2 m-0">
                            <Link
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100 hover:scale-105 text-nowrap"
                              href="/student/my-account"
                            >
                              My Account
                            </Link>
                            <Link
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100  hover:scale-105"
                              href="/student/settings"
                            >
                              Settings
                            </Link>
                            <Link
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-red-500 hover:scale-105"
                              href="/login"
                            >
                              Log Out
                            </Link>
                          </div>
                        </div>
                      )} */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                // href={isDisabled ? "#" : "/student/my-account"}
                href="/student/my-account"
                current={pathname.startsWith("/student/my-account")}
              >
                <MdOutlineAccountCircle className="text-lg" />
                <SidebarLabel>My Account</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/student"
                current={
                  pathname === "/student" ||
                  pathname.startsWith("/student/onboarding")
                }
              >
                <Squares2X2Icon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                // href={isDisabled ? "" : "/student/recordings"}
                href={"/student/recordings"}
                current={pathname.startsWith("/student/recordings")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <CalendarIcon />
                <SidebarLabel>Recordings</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                // href={isDisabled ? "" : "/student/find-a-tutor"}
                href={"/student/find-a-tutor"}
                current={pathname.startsWith("/student/find-a-tutor")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <AcademicCapIcon />
                <SidebarLabel>Find a Tutor</SidebarLabel>
              </SidebarItem>

              {/* <SidebarItem
                // href={isDisabled ? "" : "/student/messages"}
                href={"/student/messages"}
                current={pathname.startsWith("/student/messages")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-2.429 0-4.817.178-7.152.521C2.87 3.061 1.5 4.795 1.5 6.741v6.018c0 1.946 1.37 3.68 3.348 3.97.877.129 1.761.234 2.652.316V21a.75.75 0 0 0 1.28.53l4.184-4.183a.39.39 0 0 1 .266-.112c2.006-.05 3.982-.22 5.922-.506 1.978-.29 3.348-2.023 3.348-3.97V6.741c0-1.947-1.37-3.68-3.348-3.97A49.145 49.145 0 0 0 12 2.25ZM8.25 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm2.625 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                    clipRule="evenodd"
                  />
                </svg>

                <SidebarLabel>Message</SidebarLabel>
              </SidebarItem> */}

              <SidebarItem
                // href={isDisabled ? "" : "/student/messages"}
                href={"/student/messages"}
                current={pathname.startsWith("/student/messages")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <ChatBubbleBottomCenterTextIcon />
                <SidebarLabel>Message</SidebarLabel>
              </SidebarItem>

              {/* <SidebarItem
                // href={isDisabled ? "" : "/student/payments"}
                href={"/student/payments"}
                current={pathname.startsWith("/student/payments")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <MdPayments />
                <SidebarLabel>Payments</SidebarLabel>
              </SidebarItem> */}

              <SidebarItem
                // href={isDisabled ? "" : "/student/settings"}
                href={"/student/settings"}
                current={pathname.startsWith("/student/settings")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <MdOutlineSettings className="text-lg" />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                // href={isDisabled ? "" : "/student/resources"}
                href={"/student/resources"}
                current={pathname.startsWith("/student/resources")}
                // className={`${
                //   isDisabled ? "bg-slate opacity-60 rounded-lg" : ""
                // }`}
              >
                <GrResources />
                <SidebarLabel>Resources Center</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href={"/login"}
                current={false}
                className="rounded-lg  bg-red-500"
              >
                <MdLogout className="text-white text-lg" />
                <SidebarLabel className="text-white">Log Out</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}

const pathnameNames: { [key: string]: string } = {
  "/teacher/my-account": "",
  "/teacher/settings": "",
};
