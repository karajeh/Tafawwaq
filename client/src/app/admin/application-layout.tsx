"use client";

import logo from "public/images/logo.svg";
import avatar from "public/images/session-oversight/avatar.svg";
import down from "public/images/dashnav/down.svg";

// import {
//   Dropdown,
//   DropdownButton,
//   // DropdownDivider,
//   // DropdownItem,
//   // DropdownLabel,
//   // DropdownMenu,
// } from "../components/admin-panel/ui/dropdown";
import {
  Navbar,
  // NavbarItem,
  NavbarSection,
} from "../components/admin-panel/ui/navbar";
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
import {
  // ArrowRightStartOnRectangleIcon,
  // ChevronDownIcon,
  // LightBulbIcon,
  // ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/16/solid";

import {
  UserIcon,
  ClockIcon,
  ChatBubbleOvalLeftIcon,
  PlusCircleIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/16/solid";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useState } from "react";
import { MdLogout } from "react-icons/md";

export function ApplicationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const dividerPaths = [
  //   "/teacher/resources",
  //   "/teacher/my-account",
  //   "/teacher/recordings",
  // ];
  // const showDivider = dividerPaths.includes(pathname);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          {/* <NavbarSpacer /> */}
          <NavbarSection>
            {/* <div className="bg-black">
              <p className="text-xl text-[#000000]"> */}
            {/* {pathnameNames[pathname]}
              </p>
            </div> */}
            <div className="w-full px-6 py-2 mx-auto">
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
                <div className="flex items-center gap-4 md:gap-5">
                  <Image src={avatar} alt="avatar" width={38} height={40} />
                  <div className="flex items-center gap-2 md:gap-3">
                    <div>
                      <h1 className="text-[13px]">Abeeda Alex</h1>
                      <h1 className="text-[14px] font-semibold text-[#707070]">
                        Admin
                      </h1>
                    </div>
                    {/* <Image src={down} alt="avatar" /> */}
                    <div className="relative inline-block">
                      {/* Arrow icon */}
                      <button className="bg-none border-none cursor-pointer">
                        <Image src={down} alt="avatar" className="w-5 h-5" />
                      </button>

                      {/* Dropdown Menu */}
                      {isOpen && (
                        <div className="absolute top-8 right-0 bg-white rounded shadow-lg z-50">
                          <div className="flex flex-col p-2 m-0">
                            <Link
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                              href="/admin/my-account"
                            >
                              MyAccount
                            </Link>
                            <Link
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                              href="/admin/settings"
                            >
                              Settings
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              {/* <SidebarItem href="/admin" current={pathname === "/admin"}>
                <Squares2X2Icon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem> */}
              <SidebarItem
                href="/admin"
                current={
                  pathname == "/admin" ||
                  pathname.startsWith("/admin/tutor-management")
                }
              >
                <UserIcon />
                <SidebarLabel>Tutor Management</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/content-creation"
                current={pathname.startsWith("/admin/content-creation")}
              >
                <PencilIcon />
                <SidebarLabel>Content Creation</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/session-oversight"
                current={pathname.startsWith("/admin/session-oversight")}
              >
                <ClockIcon />
                <SidebarLabel>Session Oversight</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/user-interaction"
                current={pathname.startsWith("/admin/user-interaction")}
              >
                <UserCircleIcon />
                <SidebarLabel>User Interaction</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/quality-assurance"
                current={pathname.startsWith("/admin/quality-assurance")}
              >
                <ClipboardDocumentCheckIcon />
                <SidebarLabel>QA Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/users"
                current={pathname.startsWith("/admin/users")}
              >
                <UsersIcon />
                <SidebarLabel>Users Management</SidebarLabel>
              </SidebarItem>

              <SidebarItem
                href="/admin/insights-and-reporting"
                current={pathname.startsWith("/admin/insights-and-reporting")}
              >
                <ChartBarSquareIcon />
                <SidebarLabel>Insights & Reporting</SidebarLabel>
              </SidebarItem>
              {/* <SidebarItem
                href="/admin/analytic-dashboard"
                current={pathname.startsWith("/admin/analytic-dashboard")}
              >
                <ChartPieIcon />
                <SidebarLabel>Analytic Dashboard</SidebarLabel>
              </SidebarItem> */}
              <SidebarItem
                href="/admin/feedback-and-complaints"
                current={pathname.startsWith("/admin/feedback-and-complaints")}
              >
                <ChatBubbleOvalLeftIcon />
                <SidebarLabel>Feedback & Complaints</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/admin/import-to-backup"
                current={pathname.startsWith("/admin/import-to-backup")}
              >
                <PlusCircleIcon />
                <SidebarLabel>Import to Backup</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href={"/login"}
                current={false}
                className="rounded-lg  bg-red-500"
              >
                <MdLogout className="text-white text-lg" />
                <SidebarLabel className="text-white">Log Out</SidebarLabel>
              </SidebarItem>
              {/* </SidebarSection> */}

              {/* <SidebarSpacer />
            <div className=" md:hidden flex justify-center">
              <LanguageChanger />
            </div>
          </SidebarBody>
        </Sidebar> */}
              {/* <SidebarItem
              href="/teacher/reviews"
              current={pathname.startsWith("/teacher/reviews")}
            >
              <StarIcon />
              <SidebarLabel>Reviews</SidebarLabel>
            </SidebarItem> */}

              {/* <SidebarItem
                href="/teacher/payments"
                current={pathname.startsWith("/teacher/payments")}
              >
                <CreditCardIcon />
                <SidebarLabel>Payments</SidebarLabel>
              </SidebarItem> */}

              {/* <SidebarItem
              href="/teacher/my-account"
              current={pathname.startsWith("/teacher/my-account")}
            >
              <UserIcon />
              <SidebarLabel>My Account</SidebarLabel>
            </SidebarItem> */}

              {/* <SidebarItem
              href="/teacher/settings"
              current={pathname.startsWith("/teacher/settings")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <SidebarLabel>Settings</SidebarLabel>
            </SidebarItem>
            <SidebarItem
              href="/teacher/recordings"
              current={pathname.startsWith("/teacher/recordings")}
            >
              <VideoCameraIcon />
              <SidebarLabel>Recordings</SidebarLabel>
            </SidebarItem> */}
            </SidebarSection>

            <SidebarSpacer />
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
    // );
    // <SidebarLayout
    //   navbar={
    //     <Navbar className="h-[87px]">
    //       {/* <NavbarSpacer /> */}
    //       <NavbarSection>
    //         <div className=" flex items-center w-full justify-between px-5">
    //           <p className=" text-xl text-primary hidden md:block">
    //             {pathnameNames[pathname]}
    //           </p>
    //           <Searchbar />
    //           <div className=" flex items-center gap-4">
    //             <div className=" hidden md:flex">
    //               <LanguageChanger />
    //             </div>
    //             <Dropdown>
    //               <DropdownButton className="shrink-0" as={NavbarItem}>
    //                 <Image
    //                   src="https://images.unsplash.com/photo-1726809448984-2e7f60cc6e97?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //                   width={44}
    //                   height={44}
    //                   alt="Admin profile image"
    //                   className="w-[44px] h-[44px] shrink-0 border rounded-full"
    //                 />
    //                 <div className="hidden lg:block">
    //                   <p className="text-sm">Hamza</p>
    //                   <p className="text-xs text-text_secondary">Admin</p>
    //                 </div>
    //               </DropdownButton>
    //               <AccountDropdownMenu anchor="bottom end" />
    //             </Dropdown>
    //           </div>
    //         </div>
    //       </NavbarSection>
    //     </Navbar>
    //   }
    //   sidebar={
    //     <Sidebar className="relative">
    //       <SidebarHeader className="w-full flex items-center justify-center font-medium">
    //         <Link href="/">
    //           <Image src={logo} width={48} height={48} alt="Logo" />
    //         </Link>
    //       </SidebarHeader>

    //       <SidebarBody>
    //     <SidebarSection>
    //       {/* <SidebarItem href="/admin" current={pathname === "/admin"}>
    //         <Squares2X2Icon />
    //         <SidebarLabel>Dashboard</SidebarLabel>
    //       </SidebarItem> */}
    //       <SidebarItem
    //         href="/admin/tutor-management"
    //         current={pathname.startsWith("/admin/tutor-management")}
    //       >
    //         <UserIcon />
    //         <SidebarLabel>Tutor Management</SidebarLabel>
    //       </SidebarItem>
    //       <SidebarItem
    //         href="/admin/content-creation"
    //         current={pathname.startsWith("/admin/content-creation")}
    //       >
    //         <PencilIcon />
    //         <SidebarLabel>Content Creation</SidebarLabel>
    //       </SidebarItem>
    //       <SidebarItem
    //         href="/admin/session-oversight"
    //         current={pathname.startsWith("/admin/session-oversight")}
    //       >
    //         <ClockIcon />
    //         <SidebarLabel>Session Oversight</SidebarLabel>
    //       </SidebarItem>
    //       <SidebarItem
    //         href="/admin/user-interaction"
    //         current={pathname.startsWith("/admin/user-interaction")}
    //       >
    //         <UserCircleIcon />
    //         <SidebarLabel>User Interaction</SidebarLabel>
    //       </SidebarItem>
    //       <SidebarItem
    //         href="/admin/insights-and-reporting"
    //         current={pathname.startsWith("/admin/insights-and-reporting")}
    //       >
    //         <ChartBarSquareIcon />
    //         <SidebarLabel>Insights & Reporting</SidebarLabel>
    //       </SidebarItem>
    //       {/* <SidebarItem
    //         href="/admin/analytic-dashboard"
    //         current={pathname.startsWith("/admin/analytic-dashboard")}
    //       >
    //         <ChartPieIcon />
    //         <SidebarLabel>Analytic Dashboard</SidebarLabel>
    //       </SidebarItem> */}
    //       <SidebarItem
    //         href="/admin/feedback-and-complaints"
    //         current={pathname.startsWith("/admin/feedback-and-complaints")}
    //       >
    //         <ChatBubbleOvalLeftIcon />
    //         <SidebarLabel>Feedback & Complaints</SidebarLabel>
    //       </SidebarItem>
    //       <SidebarItem
    //         href="/admin/import-to-backup"
    //         current={pathname.startsWith("/admin/import-to-backup")}
    //       >
    //         <PlusCircleIcon />
    //         <SidebarLabel>Import to Backup</SidebarLabel>
    //       </SidebarItem>
    //     </SidebarSection>

    //     <SidebarSpacer />
    //     <div className=" md:hidden flex justify-center">
    //       <LanguageChanger />
    //     </div>
    //   </SidebarBody>
    // </Sidebar>
    //   }
    // >
    //   {children}
    // </SidebarLayout>
  );
}

// const pathnameNames = {
//   "/admin/tutor-management": "Tutor Management",
//   "/admin/content-creation": "Content Creation",
//   "/admin/feedback-and-complaints": "Feedback & Complaints",
//   "/admin/user-interation": "User Interaction",
//   "/admin/session-oversight": "Session Overdight",
//   "/admin/user-interaction": "User Interaction",
//   "/admin/insights-and-reporting": "Insignts & Reporting",
//   "/admin/Analytic Dashboard": " Analytic & Reporting ",
//   "/admin/data-export-and-import": "Data Export and Import",
// };

// const LanguageChanger = () => {
//   return (
//     <Dropdown>
//       <DropdownButton as={NavbarItem}>
//         <Image
//           width={20}
//           height={20}
//           src={usaflag}
//           className="w-5 h-5 rounded-full"
//           alt=""
//         />

//         <div className=" ">Eng (US)</div>
//         <ChevronDownIcon />
//       </DropdownButton>
//     </Dropdown>
//   );
// };

// const usaflag =
//   "data:image/jpeg;base64,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";
